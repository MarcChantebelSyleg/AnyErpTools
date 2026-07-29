function displayOrganizationBlocToChoose(organization, organizationsSelection) {
    const div = document.createElement("div");
    div.classList.add("organizationSelected");
    div.setAttribute("data-chosed", selectAll.checked ? "1" : "0");
    div.setAttribute("data-id", organization.Id[0]);
    div.setAttribute("data-name", organization.Name[0]);
    div.setAttribute("data-parent-id", organization.ParentId[0]);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = selectAll.checked;
    checkbox.addEventListener("click", (e) => {
        const chosed = e.currentTarget.parentNode.getAttribute("data-chosed");

        if (chosed == 0) e.currentTarget.parentNode.setAttribute("data-chosed", "1");
        else e.currentTarget.parentNode.setAttribute("data-chosed", "0");
    });

    div.appendChild(checkbox);

    const organizationName = document.createElement("span");
    organizationName.classList.add("historicOrganizationName");
    organizationName.innerText = organization.Name;
    div.appendChild(organizationName);

    organizationsSelection.append(div);
}

function displayAllOrganizations(json) {
    const firstKey = Object.keys(json)[0];
    const organizationsSelection = document.getElementById("organizationsSelection");

    organizationsSelection.innerHTML = "";
    for (const organization of json[firstKey].ORGANIZATION_TREE_TABLE[0].ORGANIZATION_ELEMENTS[0].ORGANIZATION_ELEMENT) {
        displayOrganizationBlocToChoose(organization, organizationsSelection);
    }

    CallHistoricFileAllDatas.setAttribute("class", "");
}

function takeJsonData(allTags, i, jsonBase, companyName) {
        const result = {isOk: false, data: null};

        return result;
}

function getTagBefore(key) {
    switch (key) {
        case "CMN_ENTITY_CONFIG":
            return ["CMN_ENTITY_CONFIG_TABLE"];
        case "INVOICE_PROCESS":
            return ["INVOICE_PROCESS_TABLE"];
        case "INVOICE_ACTIVITY":
            return ["INVOICE_ACTIVITY_TABLE"];
        case "INVOICE_RECIPIENTRESOLVER":
            return ["INVOICE_RECIPIENTRESOLVER_TABLE"];
        case "INVOICE_ACTIVITY_PARAMETER":
            return ["INVOICE_ACTIVITYPARAMETER_TABLE"];
        case "INVOICE_TRANSITION":
            return ["INVOICE_TRANSITION_TABLE"];
        case "EXT_IF_BASICDATA":
            return ["EXT_IF_BASICDATA_TABLE"];
        case "EXT_IF_BASICDATA_MAPPINGS":
            return ["EXT_IF_BASICDATA_MAPPINGS_TABLE"];
        case "EXT_IF_BASICDATA_CHILDNODES":
            return ["EXT_IF_BASICDATA_CHILDNODES_TABLE"];
        case "EXT_IF_TRANSFER_RESP_ROUTINES":
            return ["EXT_IF_TRANSFER_RESP_ROUTINES_TABLE"];
        case "EXT_IF_TRANSFER_MAPPINGS":
            return ["EXT_IF_TRANSFER_MAPPINGS_TABLE"];
        case "EXT_IF_TRANSFER_RESP_MAPPINGS_TABLE":
            return ["EXT_IF_TRANSFER_RESP_MAPPINGS_TABLE"];
        case "EXT_IF_TRANSFER_ROUTINES_TABLE":
            return ["EXT_IF_TRANSFER_ROUTINES_TABLE"];
        case "EXT_IF_ORDERIMPORT_MAPPINGS":
            return ["EXT_IF_ORDERIMPORT_MAPPINGS_TABLE"];
        case "EXT_IF_ORDERIMPORT_ROUTINES":
            return ["EXT_IF_ORDERIMPORT_ROUTINES_TABLE"];
        case "ORGANIZATION_ELEMENTS":
            return ["ORGANIZATION_TREE_TABLE", "ORGANIZATION_ELEMENTS"];
        default:
            throw new Exception("Erreur : aucune liste de noeux déclarée");
    }
}

function generateFileInspectionArray(keys) {
    let jsonArray = {};
    
    for (const key of keys) {
        jsonArray[key] = {"datas" : [], "temp" : "", "tagsBefore": getTagBefore(key)};
    }
    
    return jsonArray;
}

function generateFinalJsonBasicStructure() {
    return generateFileInspectionArray([
        "CMN_ENTITY_CONFIG", "INVOICE_PROCESS", "INVOICE_ACTIVITY", "INVOICE_RECIPIENTRESOLVER",
        "INVOICE_ACTIVITY_PARAMETER", "INVOICE_TRANSITION", "EXT_IF_BASICDATA", "EXT_IF_BASICDATA_MAPPINGS",
        "EXT_IF_BASICDATA_CHILDNODES", "EXT_IF_TRANSFER_RESP_ROUTINES", "EXT_IF_TRANSFER_MAPPINGS",
        "EXT_IF_TRANSFER_RESP_MAPPINGS_TABLE", "EXT_IF_TRANSFER_ROUTINES_TABLE", "EXT_IF_ORDERIMPORT_MAPPINGS",
        "EXT_IF_ORDERIMPORT_ROUTINES", "ORGANIZATION_ELEMENTS"
    ]);
}

function inspectFile(json, companyId, companyName) {
    const firstTag = Object.keys(json);
    const jsonBase = json[firstTag];
    const datas = generateFinalJsonBasicStructure();

    /* Invoice Process : START scanning */
    for (let i = 0; i < jsonBase.INVOICE_PROCESS_TABLE[0].INVOICE_PROCESS.length; i++) {
        if (jsonBase.INVOICE_PROCESS_TABLE[0].INVOICE_PROCESS[i].AdministrativeSiteId[0] == companyId) {
            datas.INVOICE_PROCESS.datas.push({... jsonBase.INVOICE_PROCESS_TABLE[0].INVOICE_PROCESS[i]});
            datas.INVOICE_PROCESS.temp += `pid*${jsonBase.INVOICE_PROCESS_TABLE[0].INVOICE_PROCESS[i].Id[0]}`;
        }
    }

    for (let i = 0; i < jsonBase.INVOICE_ACTIVITY_TABLE[0].INVOICE_ACTIVITY.length; i++) {
        if (datas.INVOICE_PROCESS.temp.indexOf(`pid*${jsonBase.INVOICE_ACTIVITY_TABLE[0].INVOICE_ACTIVITY[i].ProcessId[0]}`) !== -1) {
            datas.INVOICE_ACTIVITY.datas.push({... jsonBase.INVOICE_ACTIVITY_TABLE[0].INVOICE_ACTIVITY[i]});
            datas.INVOICE_ACTIVITY.temp += `pac*${jsonBase.INVOICE_ACTIVITY_TABLE[0].INVOICE_ACTIVITY[i].Id[0]}`;
        }
    }

    for (let i = 0; i < jsonBase.INVOICE_RECIPIENTRESOLVER_TABLE[0].INVOICE_RECIPIENTRESOLVER.length; i++) {
        if (datas.INVOICE_ACTIVITY.temp.indexOf(`pac*${jsonBase.INVOICE_RECIPIENTRESOLVER_TABLE[0].INVOICE_RECIPIENTRESOLVER[i].ActivityId[0]}`) !== -1) {
            datas.INVOICE_RECIPIENTRESOLVER.datas.push({... jsonBase.INVOICE_RECIPIENTRESOLVER_TABLE[0].INVOICE_RECIPIENTRESOLVER[i]});
        }
    }

    for (let i = 0; i < jsonBase.INVOICE_ACTIVITYPARAMETER_TABLE[0].INVOICE_ACTIVITYPARAMETER.length; i++) {
        if (datas.INVOICE_ACTIVITY.temp.indexOf(`pac*${jsonBase.INVOICE_ACTIVITYPARAMETER_TABLE[0].INVOICE_ACTIVITYPARAMETER[i].ActivityId[0]}`) !== -1) {
            datas.INVOICE_ACTIVITY_PARAMETER.datas.push({... jsonBase.INVOICE_ACTIVITYPARAMETER_TABLE[0].INVOICE_ACTIVITYPARAMETER[i]});
        }
    }

    for (let i = 0; i < jsonBase.INVOICE_TRANSITION_TABLE[0].INVOICE_TRANSITION.length; i++) {
        if (datas.INVOICE_PROCESS.temp.indexOf(`pid*${jsonBase.INVOICE_TRANSITION_TABLE[0].INVOICE_TRANSITION[i].ProcessId[0]}`) !== -1) {
            datas.INVOICE_TRANSITION.datas.push({... jsonBase.INVOICE_TRANSITION_TABLE[0].INVOICE_TRANSITION[i]});
        }
    }

    /* Invoice Process : END scanning */

    /* System Mapping : START scanning */ 
    for (let i = 0; i < jsonBase.EXT_IF_BASICDATA_TABLE[0].EXT_IF_BASICDATA.length; i++) {
        if (jsonBase.EXT_IF_BASICDATA_TABLE[0].EXT_IF_BASICDATA[i].ADMINISTRATIVE_SITE_ID[0] == companyId) {
            datas.EXT_IF_BASICDATA.datas.push({... jsonBase.EXT_IF_BASICDATA_TABLE[0].EXT_IF_BASICDATA[i]});
            datas.EXT_IF_BASICDATA.temp += `extba*${jsonBase.EXT_IF_BASICDATA_TABLE[0].EXT_IF_BASICDATA[i].Id[0]}`;
        }
    }

    for (let i = 0; i < jsonBase.EXT_IF_BASICDATA_MAPPINGS_TABLE[0].EXT_IF_BASICDATA_MAPPINGS.length; i++) {
        if (jsonBase.EXT_IF_BASICDATA_MAPPINGS_TABLE[0].EXT_IF_BASICDATA_MAPPINGS[i].ADMINISTRATIVE_SITE_ID[0] == companyId) {
            datas.EXT_IF_BASICDATA_MAPPINGS.datas.push({... jsonBase.EXT_IF_BASICDATA_MAPPINGS_TABLE[0].EXT_IF_BASICDATA_MAPPINGS[i]});
        }
    }

    for (let i = 0; i < jsonBase.EXT_IF_BASICDATA_CHILDNODES_TABLE[0].EXT_IF_BASICDATA_CHILDNODES.length; i++) {
        if (jsonBase.EXT_IF_BASICDATA_CHILDNODES_TABLE[0].EXT_IF_BASICDATA_CHILDNODES[i].ADMINISTRATIVE_SITE_ID[0] == companyId) {
            datas.EXT_IF_BASICDATA_CHILDNODES.datas.push({... jsonBase.EXT_IF_BASICDATA_CHILDNODES_TABLE[0].EXT_IF_BASICDATA_CHILDNODES[i]});
        }
    }

    for (let i = 0; i < jsonBase.EXT_IF_TRANSFER_RESP_ROUTINES_TABLE[0].EXT_IF_TRANSFER_RESP_ROUTINES.length; i++) {
        if (jsonBase.EXT_IF_TRANSFER_RESP_ROUTINES_TABLE[0].EXT_IF_TRANSFER_RESP_ROUTINES[i].ADMINISTRATIVE_SITE_ID[0] == companyId) {
            datas.EXT_IF_TRANSFER_RESP_ROUTINES.datas.push({... jsonBase.EXT_IF_TRANSFER_RESP_ROUTINES_TABLE[0].EXT_IF_TRANSFER_RESP_ROUTINES[i]});
        }
    }

    for (let i = 0; i < jsonBase.EXT_IF_TRANSFER_MAPPINGS_TABLE[0].EXT_IF_TRANSFER_MAPPINGS.length; i++) {
        if (jsonBase.EXT_IF_TRANSFER_MAPPINGS_TABLE[0].EXT_IF_TRANSFER_MAPPINGS[i].ADMINISTRATIVE_SITE_ID[0] == companyId) {
            datas.EXT_IF_TRANSFER_MAPPINGS.datas.push({... jsonBase.EXT_IF_TRANSFER_MAPPINGS_TABLE[0].EXT_IF_TRANSFER_MAPPINGS[i]});
        }
    }

    for (let i = 0; i < jsonBase.EXT_IF_TRANSFER_RESP_MAPPINGS_TABLE[0].EXT_IF_TRANSFER_RESP_MAPPINGS.length; i++) {
        if (jsonBase.EXT_IF_TRANSFER_RESP_MAPPINGS_TABLE[0].EXT_IF_TRANSFER_RESP_MAPPINGS[i].ADMINISTRATIVE_SITE_ID[0] == companyId) {
            datas.EXT_IF_TRANSFER_RESP_MAPPINGS.datas.push({... jsonBase.EXT_IF_TRANSFER_RESP_MAPPINGS_TABLE[0].EXT_IF_TRANSFER_RESP_MAPPINGS[i]});
        }
    }

    for (let i = 0; i < jsonBase.EXT_IF_TRANSFER_ROUTINES_TABLE[0].EXT_IF_TRANSFER_ROUTINES.length; i++) {
        if (jsonBase.EXT_IF_TRANSFER_ROUTINES_TABLE[0].EXT_IF_TRANSFER_ROUTINES[i].ADMINISTRATIVE_SITE_ID[0] == companyId) {
            datas.EXT_IF_TRANSFER_ROUTINES.datas.push({... jsonBase.EXT_IF_TRANSFER_ROUTINES_TABLE[0].EXT_IF_TRANSFER_ROUTINES[i]});
        }
    }

    for (let i = 0; i < jsonBase.EXT_IF_ORDERIMPORT_MAPPINGS_TABLE[0].EXT_IF_ORDERIMPORT_MAPPINGS.length; i++) {
        if (jsonBase.EXT_IF_ORDERIMPORT_MAPPINGS_TABLE[0].EXT_IF_ORDERIMPORT_MAPPINGS[i].ADMINISTRATIVE_SITE_ID[0] == companyId) {
            datas.EXT_IF_ORDERIMPORT_MAPPINGS.datas.push({... jsonBase.EXT_IF_ORDERIMPORT_MAPPINGS_TABLE[0].EXT_IF_ORDERIMPORT_MAPPINGS[i]});
        }
    }

        for (let i = 0; i < jsonBase.EXT_IF_ORDERIMPORT_ROUTINES_TABLE[0].EXT_IF_ORDERIMPORT_ROUTINES.length; i++) {
        if (jsonBase.EXT_IF_ORDERIMPORT_ROUTINES_TABLE[0].EXT_IF_ORDERIMPORT_ROUTINES[i].ADMINISTRATIVE_SITE_ID[0] == companyId) {
            datas.EXT_IF_ORDERIMPORT_ROUTINES.datas.push({... jsonBase.EXT_IF_ORDERIMPORT_ROUTINES_TABLE[0].EXT_IF_ORDERIMPORT_ROUTINES[i]});
        }
    }
    //TODO: continue 
    /* System Mapping : END scanning */

    // Faire un mapping des organisations pour ensuite reprendre les configs
    for (let i = 0; i < jsonBase.ORGANIZATION_TREE_TABLE[0].ORGANIZATION_ELEMENTS[0].ORGANIZATION_ELEMENT.length; i++) {
        if (jsonBase.ORGANIZATION_TREE_TABLE[0].ORGANIZATION_ELEMENTS[0].ORGANIZATION_ELEMENT[i].Name[0] == companyName) {
            datas.ORGANIZATION_ELEMENTS.datas.push({... jsonBase.ORGANIZATION_TREE_TABLE[0].ORGANIZATION_ELEMENTS[0].ORGANIZATION_ELEMENT[i]});
            if (jsonBase.ORGANIZATION_TREE_TABLE[0].ORGANIZATION_ELEMENTS[0].ORGANIZATION_ELEMENT[i].PurchaseEntityConfigId !== undefined)
                datas.ORGANIZATION_ELEMENTS.temp += `pec*${jsonBase.ORGANIZATION_TREE_TABLE[0].ORGANIZATION_ELEMENTS[0].ORGANIZATION_ELEMENT[i].PurchaseEntityConfigId[0]}`;
        }
    }

    /* Entity Mapping : START scanning */
    
    for (let i = 0; i < jsonBase.CMN_ENTITY_CONFIG_TABLE[0].CMN_ENTITY_CONFIG.length; i++) {
        if (datas.ORGANIZATION_ELEMENTS.temp.indexOf(`pec${jsonBase.CMN_ENTITY_CONFIG_TABLE[0].CMN_ENTITY_CONFIG[i].ID[0]}`) != -1) {
            datas.CMN_ENTITY_CONFIG.datas.push({... jsonBase.CMN_ENTITY_CONFIG_TABLE[0].CMN_ENTITY_CONFIG[i]});
            datas.CMN_ENTITY_CONFIG.temp += `cid*${jsonBase.CMN_ENTITY_CONFIG_TABLE[0].CMN_ENTITY_CONFIG[i].ID[0]}`;
        }
    }
    /* Entity Mapping : END scanning */

    return datas;
}

function getJSONItems(datas, key) {
    const items = [];

    for (const data of datas) {
        items.push({[key] : {... data}});
    }

    return items;
}

function IntegrateSubDatasInXmlSection(finalJson, jsonKey, json) {
    if (jsonKey !== "ORGANIZATION_ELEMENTS") return {
        ...finalJson.CT,
        [json[jsonKey].tagsBefore[0]]: getJSONItems(json[jsonKey].datas, jsonKey)
    };
    return {
        ...finalJson.CT,
        [json[jsonKey].tagsBefore[0]]: {
            [json[jsonKey].tagsBefore[1]] : getJSONItems(json[jsonKey].datas, jsonKey)
        }
    }
}

function formatHistoricJSONAfterTreatment(json) {
    const finalJson = {CT: {
        Tenant_Name: document.getElementById("newTenantName").value || "vosylegXXX",
        Database_Type: "Oracle",
        Product_Version: "26.6.0.4",
        Deployment_Type: "hot",
        attr: {IsOrganizationIncluded: "true"}
    }};

    for (const jsonKey of Object.keys(json)) {
        finalJson.CT = IntegrateSubDatasInXmlSection(finalJson, jsonKey, json);
    }

    return finalJson;
}

function preFormatageHistoric(json) {
    const datas = generateFinalJsonBasicStructure();

    for (const jsonPart of json) {
        for (const key of Object.keys(jsonPart)) {
            datas[key].datas = [... datas[key].datas, ...jsonPart[key].datas];
        }
    }

    return datas;
}

function generateNewXmlFileForEachCompany(json) {
    const chosedOrganizations = document.querySelectorAll(".organizationSelected[data-chosed='1']");
    const finalResult = [];

    for (const chosedOrganizationsHTML of chosedOrganizations) {
        finalResult.push(inspectFile(json, chosedOrganizationsHTML.getAttribute("data-id"), chosedOrganizationsHTML.getAttribute("data-name")));
    }

    return formatHistoricJSONAfterTreatment(preFormatageHistoric(finalResult));
}
