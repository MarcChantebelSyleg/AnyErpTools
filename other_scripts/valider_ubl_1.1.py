#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Validateur UBL local (EN 16931 + profil francais EXTENDED-CTC-FR / FNFE-MPE).
Usage : python valider_ubl.py ma_facture.xml
Voir le mode d'emploi (MODE_EMPLOI.txt).
"""
import os, re, sys, subprocess
import xml.etree.ElementTree as ET
try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    pass

SVRL = "{http://purl.oclc.org/dsdl/svrl}"
HERE = os.path.dirname(os.path.abspath(__file__))
REPO_URL = "https://github.com/fnfempe/France_RFE.git"

def trouver_repo():
    for c in (os.path.join(os.getcwd(), "France_RFE"), os.path.join(HERE, "France_RFE")):
        if os.path.isdir(os.path.join(c, "FNFE_RFE_INVOICE")):
            return c
    # pas trouve -> on tente un git clone
    cible = os.path.join(HERE, "France_RFE")
    print("Depot de regles FNFE-MPE introuvable, tentative de telechargement (git)...")
    try:
        subprocess.run(["git", "clone", "--depth", "1", REPO_URL, cible], check=True)
        return cible
    except Exception:
        print("\n[!] Impossible de telecharger automatiquement.")
        print("    Telecharge le ZIP ici : https://github.com/fnfempe/France_RFE")
        print("    puis decompresse-le a cote de ce script (dossier 'France_RFE').")
        sys.exit(2)

def main():
    if len(sys.argv) != 2:
        print("Usage : python valider_ubl.py ma_facture.xml"); sys.exit(1)
    xml_path = sys.argv[1]
    if not os.path.isfile(xml_path):
        print(f"Fichier introuvable : {xml_path}"); sys.exit(1)

    try:
        from lxml import etree
        from saxonche import PySaxonProcessor
    except ImportError:
        print("Dependances manquantes. Lance :  pip install saxonche lxml"); sys.exit(1)

    repo = trouver_repo()
    ubl = os.path.join(repo, "FNFE_RFE_INVOICE", "UBL")
    xsd = os.path.join(ubl, "1xsd_UBL2.1", "maindoc", "UBL-Invoice-2.1.xsd")
    couches = [
        ("EN 16931",                     os.path.join(ubl, "EN16931", "2xslt", "EN16931-UBL-validation.xslt"),        "warning"),
        ("Profil EXTENDED-CTC-FR",       os.path.join(ubl, "EXTENDED-CTC-FR", "2xslt", "EXTENDED-CTC-FR-UBL.xslt"),    "fatal"),
        ("Regles FR  BR-FR (fatal)",     os.path.join(ubl, "EXTENDED-CTC-FR", "2xslt", "BR-FR-Flux2-Schematron-UBL.xslt"),         "fatal"),
        ("Regles FR  BR-FR (warning)",   os.path.join(ubl, "EXTENDED-CTC-FR", "2xslt", "BR-FR-Flux2-Schematron-UBL_WARNING.xslt"), "warning"),
    ]

    print("=" * 64)
    print(f" Validation UBL : {os.path.basename(xml_path)}")
    print("=" * 64)

    total_fatal, details = 0, []

    # 1) Schema XSD
    try:
        schema = etree.XMLSchema(etree.parse(xsd))
        doc = etree.parse(xml_path)
        if schema.validate(doc):
            print(f"[XSD] Schema UBL-Invoice-2.1 ............ OK")
        else:
            print(f"[XSD] Schema UBL-Invoice-2.1 ............ INVALIDE")
            for e in schema.error_log:
                total_fatal += 1
                details.append(("FATAL", "XSD", f"L{e.line}: {e.message}", ""))
    except Exception as e:
        print(f"[XSD] erreur : {e}")

    # 2) Schematron (4 couches)
    with PySaxonProcessor(license=False) as proc:
        xslt = proc.new_xslt30_processor()
        for nom, path, defaut in couches:
            if not os.path.isfile(path):
                print(f"[{nom}] XSLT absente : {path}"); continue
            try:
                svrl = xslt.compile_stylesheet(stylesheet_file=path).transform_to_string(source_file=xml_path)
                root = ET.fromstring(svrl)
            except Exception as e:
                print(f"[{nom}] erreur d'execution : {e}"); continue
            nf = nw = 0
            for el in root.findall(f".//{SVRL}failed-assert") + root.findall(f".//{SVRL}successful-report"):
                sev = (el.get("flag") or el.get("role") or defaut).lower()
                sev = "FATAL" if "fatal" in sev or "error" in sev else "WARNING"
                rid = el.get("id", "")
                loc = el.get("location", "")
                t = el.find(f"{SVRL}text")
                msg = re.sub(r"\s+", " ", (t.text or "").strip()) if t is not None else ""
                details.append((sev, rid, msg, loc))
                if sev == "FATAL": nf += 1; total_fatal += 1
                else: nw += 1
            print(f"[{nom}] .......... {nf} fatal, {nw} warning")

    if details:
        print("\n--- Detail ---")
        for sev, rid, msg, loc in sorted(details, key=lambda d: d[0] != "FATAL"):
            print(f"[{sev}] {rid} : {msg}")
            if loc: print(f"        @ {loc}")

    print("\n" + "=" * 64)
    if total_fatal == 0:
        nb_w = sum(1 for d in details if d[0] == "WARNING")
        print(f" RESULTAT : VALIDE (0 erreur fatale). {nb_w} warning(s) non bloquant(s).")
    else:
        print(f" RESULTAT : REJETE — {total_fatal} erreur(s) fatale(s) a corriger.")
    print("=" * 64)
    sys.exit(1 if total_fatal else 0)

if __name__ == "__main__":
    main()
