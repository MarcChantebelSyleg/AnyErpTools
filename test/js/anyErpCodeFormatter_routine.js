function formatBaseware(input) {
    const TAB = "    ";
    let pos = 0;
    const N = input.length;

    // helpers pour lire sans perdre position
    function peek(n = 0) { return input[pos + n]; }
    function eof() { return pos >= N; }

    function skipSpacesOutsideQuotes() {
        while (!eof() && /\s/.test(peek())) pos++;
    }

    function readWhile(predicate) {
        let s = "";
        while (!eof() && predicate(peek())) s += input[pos++]; 
        return s;
    }

    function readIdent() {
        return readWhile(ch => /[A-Za-z0-9_]/.test(ch));
    }

    function readQuoted() {
        // lit une chaîne entre guillemets "..." (les guillemets inclus)
        let s = "";
        if (peek() === '"') {
            s += input[pos++]; // "
            while (!eof()) {
                const ch = peek();
                s += ch;
                pos++;
                if (ch === '"') break;
            }
        }
        return s;
    }

    function readEntity() {
        // lit &...;
        let s = "";
        if (peek() === '&') {
            while (!eof()) {
                s += input[pos++];
                if (s.endsWith(';')) break;
            }
        }
        return s;
    }

    // ----- PARSING -----
    // Node types: {type: 'func', name: 'AND', args: [...]}
    //             {type: 'token', text: 'p,Pattern'}  (plain token)
    function parseFunction() {
        // on suppose pos pointe sur 'F' et input[pos+1] === ','
        pos += 2; // skip "F,"
        const name = readIdent();
        // accepter éventuels espaces puis '('
        while (!eof() && /\s/.test(peek())) pos++;
        if (peek() === '(') pos++;

        const args = parseArgsUntilClose();
        return { type: 'func', name, args };
    }

    function parseArgsUntilClose() {
        const args = [];
        let buf = "";

        function flushBufAsToken() {
            const t = buf.trim();
            if (t.length > 0) {
                args.push({ type: 'token', text: t });
            }
            buf = "";
        }

        while (!eof()) {
            const ch = peek();

            // début d'une fonction imbriquée
            if (ch === 'F' && peek(1) === ',') {
                flushBufAsToken();
                const fn = parseFunction();
                args.push(fn);
                continue;
            }

            // guillemet
            if (ch === '"') {
                buf += readQuoted();
                continue;
            }

            // entité XML
            if (ch === '&') {
                buf += readEntity();
                continue;
            }

            // point-virgule : séparateur d'argument AU NIVEAU ACTUEL
            if (ch === ';') {
                // le ; sépare : on flush le buffer comme argument (si présent)
                flushBufAsToken();
                // on marque implicitement le séparateur en ajoutant un token spécial
                // mais pour la simplicité on conserve la logique de rendu : les tokens non-last recevront un ';'
                pos++; // consommer ;
                continue;
            }

            // parenthèse fermante => fin des args pour cette fonction
            if (ch === ')') {
                flushBufAsToken();
                pos++; // consommer ')'
                return args;
            }

            // accolades ne sont pas attendues ici mais on les gère (sûreté)
            if (ch === '{' || ch === '}') {
                // flush si besoin et retourner / continuer
                flushBufAsToken();
                // ne consommerons pas ces accolades ici (caller les traitera)
                return args;
            }

            // espace hors guillemets : on l'ignore
            if (/\s/.test(ch)) { pos++; continue; }

            // caractère normal -> accumulate
            buf += ch;
            pos++;
        }

        // fin de chaîne : flush
        flushBufAsToken();
        return args;
    }

    // parse root : accepte une accolade ouvrante optionnelle
    pos = 0;
    skipSpacesOutsideQuotes();
    let hadBrace = false;
    if (!eof() && peek() === '{') { pos++; hadBrace = true; }

    // si pas d'accolade initiale, on peut tenter de parser une fonction ou le contenu
    let rootNodes = [];
    while (!eof()) {
        skipSpacesOutsideQuotes();
        if (eof()) break;
        if (peek() === '}') { pos++; break; }
        if (peek() === 'F' && peek(1) === ',') {
            rootNodes.push(parseFunction());
            continue;
        }
        // sinon avancer d'un caractère pour éviter boucle infinie
        pos++;
    }

    // ----- RENDERING -----
    function renderNode(node, level = 0) {
        const lines = [];
        const indent = s => TAB.repeat(s);

        if (node.type === 'func') {
            lines.push(indent(level) + `F,${node.name}(`);
            // render args: each arg printed; if arg is token and not last -> add ';'
            const args = node.args;
            for (let ai = 0; ai < args.length; ai++) {
                const a = args[ai];
                const isLast = (ai === args.length - 1);
                if (a.type === 'func') {
                    // nested function: render its whole block (it will end with ");")
                    const nested = renderNode(a, level + 1);
                    lines.push(...nested);
                } else { // token
                    // token text may contain commas (p,Pattern) or operators (=, <> ...)
                    const text = a.text;
                    lines.push(indent(level + 1) + text + (isLast ? "" : ";"));
                }
            }
            lines.push(indent(level) + ");");
        } else { // token node at root (rare)
            lines.push(indent(level) + node.text);
        }

        return lines;
    }

    // render all root nodes inside braces
    const outLines = [];
    if (hadBrace) outLines.push("{");
    for (let n = 0; n < rootNodes.length; n++) {
        const node = rootNodes[n];
        const rendered = renderNode(node, hadBrace ? 1 : 0);
        outLines.push(...rendered);
    }
    if (hadBrace) outLines.push("}");

    return "<pre>" + outLines.join("\n") + "</pre>";
}

function r1fl(s) {
    return s.substring(0, s.length - 1);
}

function fEl1P(el1) {
    return el1.replace(/""/gm, '"');
}
