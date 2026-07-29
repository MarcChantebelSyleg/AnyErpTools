function getAllPossibleTagsForKey(key) {
    switch(key) {
        case "CMN_SCREEN":
            return ["ID", "SCREEN_KEY", "PRODUCT_CODE", "NAME", "DESCRIPTION"];
        case "CMN_SCHEMA":
            return ["ID", "SOURCE_TYPE", "SOURCE", "NAME", "DESCRIPTION", "EXTERNAL", "ACTIVE", "RESOURCE_ID"];
        case "CMN_SCHEMA_ITEM":
            return ["ID", "SCHEMA_ID", "ENTITY_PROPERTY", "SOURCE_PROPERTY", "TYPE", "EXTERNAL", "RESOURCE_ID", "TOOLTIP_RESOURCE_ID", "NAME", "ALIGNMENT", "MAX_LENGTH", "IsMaskable"];
        case "CMN_SCREEN_SCHEMA":
            return ["ID", "SCREEN_ID", "SCHEMA_ID", "SCHEMA_TYPE", "NAME", "RESOURCE_ID"];
        case "CMN_LIST_VIEW":
            return ["ID", "SCREEN_SCHEMA_ID", "NAME", "COMPOSITE_ID"];
        case "CMN_LIST_VIEW_ITEM":
            return ["ID", "LIST_VIEW_ID", "SCHEMA_ITEM_ID", "BINDING_PATH", "COLUMN_INDEX", "ADDITIONAL", "FILTER_TYPE", "RESOURCE_ID", "TOOLTIP_RESOURCE_ID", "FORMAT", "ALIGNMENT", "COMPOSITE_ID"];
        case "CMN_ENTITY_CONFIG":
            return ["ID", "NAME", "DESCRIPTION", "RESOURCE_ID", "Active", "IsMinConfig"];
        case "CMN_ENTITY_TYPE_CONFIG":
            return ["ID", "ENTITY_CONFIG_ID", "SCHEMA_ID", "NAME", "COMPOSITE_ID"];
        case "CMN_ENTITY_CONFIG_ITEM":
            return ["ID", "ENTITY_TYPE_CONFIG_ID", "SCHEMA_ITEM_ID", "MANDATORY", "READONLY", "LOOKUP_LIST_ID", "DESCRIPTION", "RESOURCE_ID", "TOOLTIP_RESOURCE_ID", "NAME", "COMPOSITE_ID"];
        case "CMN_ENTITY_DIFFERENCE_CALC":
            return ["ID", "ENTITY_CONFIG_ID", "NET_SUM_CHECK", "GROSS_SUM_CHECK", "TAX_SUM_CHECK", "CUSTOM_CHECK"];
        case "CMN_EDIT_VIEW":
            return ["ID", "SCREEN_ID", "ENTITY_CONFIG_ID", "NAME", "COMPOSITE_ID"];
        case "CMN_EDIT_TYPE_VIEW":
            return ["ID", "EDIT_VIEW_ID", "ENTITY_TYPE_CONFIG_ID", "SCREEN_SCHEMA_ID", "NAME", "DESCRIPTION", "COLUMN_COUNT", "COMPOSITE_ID"];
        case "CMN_EDIT_VIEW_ITEM":
            return ["ID", "EDIT_TYPE_VIEW_ID", "ENTITY_CONFIG_ITEM_ID", "COLUMN_INDEX", "VISIBLE", "READONLY", "EDITOR_TYPE", "RESOURCE_ID", "TOOLTIP_RESOURCE_ID", "MANDATORY", "COMPOSITE_ID"];
        case "CMN_EDIT_VIEW_SUMMARY_ITEM":
            return ["ID", "EDIT_TYPE_VIEW_ID", "SCHEMA_ITEM_ID", "COLUMN_INDEX", "ALIGNMENT", "RESOURCE_ID", "TOOLTIP_RESOURCE_ID", "COMPOSITE_ID"];
        case "CMN_ENTITY_ACTION_RULE":
            return ["ID", "ENTITY_CONFIG_ID", "ACTION_IDENTIFIER", "ENTITY_ITEM_RULE_ID"];
        case "CMN_ENTITY_ITEM_RULE":
            return ["ID", "ENTITY_CONFIG_ITEM_ID", "NAME", "DESCRIPTION", "EXPRESSION", "SEVERITY", "RESOURCE_ID"];
        case "CMN_ENTITY_RULE_PARAMETER":
            return ["ID", "ENTITY_CONFIG_ID", "FIXED_RULE_IDENTIFIER", "VALUE"];
        case "CMN_ENTITY_TYPE_RULE":
            return ["ID", "ENTITY_TYPE_CONFIG_ID", "NAME", "DESCRIPTION", "EXPRESSION", "SEVERITY", "RESOURCE_ID", "COMPOSITE_ID"];
        case "CMN_LIST_SOURCE":
            return ["ID", "NAME", "ADAPTER_KEY", "SOURCE"];
        case "CMN_LIST_SOURCE_COLUMN":
            return ["ID", "LIST_SOURCE_ID", "NAME", "SOURCE"];
        case "CMN_LOOKUP_LIST":
            return ["ID", "LIST_SOURCE_ID", "VALUE_COLUMN_ID", "NAME_COLUMN_ID", "UNIQUE_COLUMN_ID", "ERROR_BEHAVIOR", "NAME", "REQUIRED_FIELDS", "UI_REQUIRED_FIELDS", "FILTER_DEPENDENCY", "TARGET_OBJECT", "PICKER_TOOLTIP_RESOURCE_ID", "SEARCH_TOOLTIP_RESOURCE_ID", "DIALOG_HEADER_RESOURCE_ID"];
        case "CMN_LOOKUP_LIST_COLUMN":
            return ["ID", "LOOKUP_LIST_ID", "LIST_SOURCE_COLUMN_ID", "TARGET_PROPERTY_NAME", "UI_TARGET_PROPERTY_NAME", "WIDTH", "COLUMN_INDEX", "SORT_INDEX", "SORT_DIRECTION", "OVERWRITE", "VISIBLE", "FILTER_TYPE", "DATA_GROUP_1", "RETURN_NULLS_1", "ENABLE_FILTER_2", "DATA_GROUP_2", "RETURN_NULLS_2", "NO_FILTER_WITH_NO_VALUES", "OPERATOR_1", "OPERATOR_2", "IS_VALUE_COLUMN", "IS_NAME_COLUMN", "IS_UNIQUE_COLUMN", "HEADER_RESOURCE_ID"];
        case "OM_CATEGORY":
            return ["ID", "ADMINISTRATIVE_SITE_ID", "ADMINISTRATIVE_SITE_ID_EXT_CODE", "PRIORITY", "NAME", "ACTIVE", "VALID_FROM_DATE", "VALID_TO_DATE", "SCHEMA_ID", "ASSOCIATE_GOODS_RECEIPTS", "ASSOCIATE_DISREGARD_GOODS_RECEIPTS", "COPY_BASELINE_CODING", "SMART_MATCHING_ENABLED", "ASSOCIATE_WITH_SAME_SIGN", "USE_CROSS_CURRENCY_MATCHING", "GR_CHECK_TOLERANCE_PER", "USE_ADDITIONAL_COSTS", "DELETED", "USE_ADJUSTMENTS", "GR_WAITING_PERIOD", "ORDER_ITEM_CALCULATION_METHOD", "SEND_DIRECTLY_TO_MM", "ACCEPT_INVOICES_WITHOUT_LINES", "ASSOCIATION_METHOD", "CODE_ADDITIONAL_COSTS", "CASCADE_MATCHING_TYPE", "WAITFORGR_BEFORE_TO_DUE_DATE", "WAITFORGR_AFTER_DELIVERY_DATE", "SEND_WAITFORGR_MSG_TO_REFPER"];
        case "OM_CATEGORY_SELECTION_COMPANY":
            return ["ID", "CATEGORY_ID", "ORGANIZATION_ELEMENT_ID", "ORGANIZATION_ELEMENT_ID_EXT_CODE"];
        case "OM_CATEGORY_FILTER":
            return ["ID", "CATEGORY_ID", "TYPE", "FIELD_NAME", "OPERATOR", "EXPECTED_VALUE"];
        case "OM2_CODING_MAPPING":
            return ["ID", "CATEGORY_ID", "ACTIVE", "TARGET_FIELD", "SOURCE_OBJECT", "SOURCE_FIELD"];
        case "OM2_VALIDATION_RULES_ALL":
            return ["ID", "VALIDATION_RULE_ID", "RULE_NAME", "RULE_DESCRIPTION_LONG", "RULE_RESOURCE_ID", "RULE_GROUP_NAME", "DOC_TYPE_SELECTION_ALLOWED", "PARAMETER_ALLOWED", "WARNING_ALLOWED", "FRAMEWORK_ALLOWED", "RETURN_PO_ALLOWED", "SERVICE_PO_ALLOWED", "STANDARD_PO_ALLOWED", "STANDARD_INVOICE_ALLOWED", "CREDIT_NOTE_ALLOWED", "SUB_CREDIT_NOTE_ALLOWED", "SUB_DEBIT_NOTE_ALLOWED", "ADDITIONAL_PARAMETERS_ALLOWED", "MATCHING_STATUS", "MATCHING_SECONDARY_STATUS", "MATCHING_ERROR_STATUS", "PERCENTUAL_TOLERANCE", "LOWER_LIMIT_RULE", "IsSelected"];
        case "OM2_BESTFIT_FUNCTIONS_ALL":
            return ["ID", "FUNCTION_ID", "FUNCTION_NAME", "FUNCTION_DESCRIPTION_LONG", "FUNCTION_RESOURCE_ID", "PERCENTUAL_TOLERANCE", "IsSelected"];
        case "OM2_BESTFIT_FUNCTIONS":
            return ["ID", "FUNCTION_ID", "CATEGORY_ID", "ACTIVE", "EXECUTION_ORDER", "MINIMUM_TOLERANCE", "MAXIMUM_TOLERANCE", "VALIDATION_RESULT", "AC_BEHAVIOR", "AC_KEYWORD"];
        case "OM2_CATEGORY_VALIDATION_RULES":
            return ["ID", "CATEGORY_ID", "VALIDATION_RULE_ID", "RULE_NAME", "RULE_DESCRIPTION_LONG", "RULE_RESOURCE_ID", "RULE_GROUP_NAME", "FRAMEWORK", "RETURN_PO", "SERVICE_PO", "STANDARD_PO", "STANDARD_INVOICE", "CREDIT_NOTE", "SUB_CREDIT_NOTE", "SUB_DEBIT_NOTE", "EXECUTION_PHASE", "VALIDATION_RESULT", "RULE_ENABLED", "RULE_MODIFIED", "RULE_CREATED", "MATCHING_STATUS", "MATCHING_SECONDARY_STATUS", "MATCHING_ERROR_STATUS", "PERCENTUAL_TOLERANCE", "LOWER_LIMIT_RULE", "DOC_TYPE_SELECTION_ALLOWED", "ADDITIONAL_PARAMETERS_ALLOWED"];
        case "OM_CONFIGURATION":
            return ["ID", "ADMINISTRATIVE_SITE_ID", "ADMINISTRATIVE_SITE_ID_EXT_CODE", "DESCRIPTION", "INFO_FLOW_ACTION", "IGNORE_ERRORS_ACTION", "BACK_TO_VALIDATION_ACTION", "REQUIRE_APPROVALS_ACTION", "SUM_CALCULATION_FIELD", "PRECISION", "MATCHING_LINE_SUM_TYPE", "SUPPLIER_NUMBER_SEARCH", "ORGANIZATION_UNIT_SEARCH", "ORDER_NUMBER_SEARCH", "HEADER_ASSOCIATION_PO", "HEADER_ASSOCIATION_SUPPLIER", "HEADER_ASSOCIATION_ORG_UNIT", "DELIVERY_NOTE_NUMBER_SEARCH", "DELETED", "WAITFORGR_WAITING_PERIOD", "WAITFORGR_BEFORE_TO_DUE_DATE", "WAITFORGR_AFTER_DELIVERY_DATE"];
        case "OM_ASSOCIATION_MAPPING_RULE":
            return ["ID", "CONDITION", "OM_CONFIGURATION_ID", "INVOICE_LINE_FIELD", "PRIORITY", "SOURCE_OBJECT", "SOURCE_FIELD"];
        case "CT_GDM_LIST":
            return ["ID", "EDIT_TYPE_VIEW_ID", "NAME", "CONFIGURATION_TYPE", "DATABASE"];
        case "INVOICE_PROCESS":
            return ["Id", "AdministrativeSiteId", "AdministrativeSiteId_EXT_CODE", "IsOrganizationInactive", "DocumentTypeName", "Name", "Enabled", "Expression", "UIExpression", "PriorityIndex", "FixedFlow"];
        case "INVOICE_ACTIVITY":
            return ["Id", "ProcessId", "ActivityName", "ActivityIndex", "ResourceId", "TaskHandlerTypeName", "ExecutionTypeValue", "RecipientRequired", "CommentRequired", "ActivityTypeValue", "Enabled", "ExecutionType", "ActivityType"];
        case "INVOICE_RECIPIENTRESOLVER":
            return ["Id", "ActivityId", "ResolverTypeName", "OrderIndex", "Exclusive", "ExclusiveAll", "SetMandatoryRecipient"];
        case "INVOICE_ACTIVITYPARAMETER":
            return ["Id", "ActivityId", "Key", "Value"];
        case "INVOICE_TRANSITION":
            return ["Id", "ProcessId", "SourceActivityId", "TargetActivityId"];
        case "PURCHASE_PROCESS":
            return ["Id", "AdministrativeSiteId", "AdministrativeSiteId_EXT_CODE", "IsOrganizationInactive", "DocumentTypeName", "Name", "Enabled", "PriorityIndex", "FixedFlow"];
        case "PURCHASE_ACTIVITY":
            return ["Id", "ProcessId", "ActivityName", "ActivityIndex", "ResourceId", "TaskHandlerTypeName", "ExecutionTypeValue", "RecipientRequired", "CommentRequired", "ActivityTypeValue", "Enabled", "ExecutionType", "ActivityType"];
        case "PURCHASE_RECIPIENTRESOLVER":
            return ["Id", "ActivityId", "ResolverTypeName", "OrderIndex", "Exclusive", "ExclusiveAll", "SetMandatoryRecipient"];
        case "PURCHASE_ACTIVITYPARAMETER":
            return ["Id", "ActivityId", "Key", "Value"];
        case "PURCHASE_TRANSITION":
            return ["Id", "ProcessId", "SourceActivityId", "TargetActivityId"];
        case "PP_CONFIGURATION":
            return ["ID", "ADMINISTRATIVE_SITE_ID", "ADMINISTRATIVE_SITE_ID_EXT_CODE", "DESCRIPTION", "ASSOCIATION_EXPRESSION", "DATE_EXPRESSION", "SUM_CALCULATION_FIELD", "FORCE_MANUAL_MATCHING", "EXT_VALIDATION_ENABLED", "BATCH_VALIDATION_DISABLED", "PRECISION", "USE_SUM_EXPRESSIONS", "BACKUP_HANDLING_MODE", "ALLOWED_APPROVAL_TO_CREATOR"];
        case "PP_ASSOCIATION_MAPPING_RULE":
            return ["ID", "CONFIGURATION_ID", "INVOICE_FIELD", "PAYMENT_PLAN_FIELD", "EXECUTION_PHASE"];
        case "CUSTOMDATACONFIGV1":
            return ["Id", "ScreenId", "Name", "Description", "PropertyName", "IsMandatory"];
        case "ORGADDRPARTKEYV1":
            return ["Id", "Key", "Name", "SortOrder"];
        case "IDENTIFIERKEYV1":
            return ["Id", "Key", "Inherit", "Inherited", "Name", "OrganizationElementId", "OrganizationElementId_EXT_CODE", "Source", "SchemeId", "IsMandatory"];
        case "SUPPADDRPARTKEYV1":
            return ["Id", "Key", "Name", "SortOrder"];
        case "LOCALIZATIONRESOURCE":
            return ["Id", "LanguageCode", "Owner", "Value", "Type"];
        case "OVERRIDELOCALIZATIONRESOURCE":
            return ["Id", "LanguageCode", "Value", "Type"];
        case "EXT_IF_BASICDATA":
            return ["ID", "ADMINISTRATIVE_SITE_ID", "ADMINISTRATIVE_SITE_ID_EXT_CODE", "INTERFACE", "FILENAME", "PATH", "TYPE", "DESTINATIONIP", "COMPLETECUSTOMINTERFACE", "IPCOMPFIELD", "LOOPINGNODE"];
        case "EXT_IF_BASICDATA_MAPPINGS":
            return ["ID", "ADMINISTRATIVE_SITE_ID", "ADMINISTRATIVE_SITE_ID_EXT_CODE", "SOURCE", "DESTINATION", "MODULE", "INTERFACE", "TYPE", "CHILDNODEID", "DEST_TYPE"];
        case "EXT_IF_BASICDATA_CHILDNODES":
            return ["ID", "ADMINISTRATIVE_SITE_ID", "ADMINISTRATIVE_SITE_ID_EXT_CODE", "NODE", "LOOPNODE", "INTERFACE", "DESTINATION", "PARENTKEYFIELD"];
        case "EXT_IF_TRANSFER_RESP_ROUTINES":
            return ["ID", "ADMINISTRATIVE_SITE_ID", "ADMINISTRATIVE_SITE_ID_EXT_CODE", "INTERFACE", "FILENAME", "PATH", "COMPLETECUSTOMINTERFACE", "COREPOSTCALLENABLED", "COREPRECALLENABLED", "XPATHOFDOCID", "LOOPINGNODEFORRESPONSE", "RESPONSEERRORMSGXPATH", "RESPONSEERRORXPATH"];
        case "EXT_IF_TRANSFER_MAPPINGS":
            return ["ID", "ADMINISTRATIVE_SITE_ID", "ADMINISTRATIVE_SITE_ID_EXT_CODE", "INTERFACE", "HEADERORROW", "SOURCEOBJECT", "SOURCE", "DESTINATION", "SUBNODE", "DESTTYPE"];
        case "EXT_IF_TRANSFER_RESP_MAPPINGS":
            return ["ID", "ADMINISTRATIVE_SITE_ID", "ADMINISTRATIVE_SITE_ID_EXT_CODE", "SOURCE", "DESTINATION", "INTERFACE", "TYPE"];
        case "EXT_IF_TRANSFER_ROUTINES":
            return ["ID", "ADMINISTRATIVE_SITE_ID", "ADMINISTRATIVE_SITE_ID_EXT_CODE", "INTERFACE", "FILENAME", "PATH", "COMPLETECUSTOMINTERFACE", "COREPOSTCALLENABLED", "COREPRECALLENABLED", "ROOTINVOICENODE", "ROWSNODE", "ROWNODE", "USEVOUCHERNUMBER", "WAITFORRESPONSE"];
        case "EXT_IF_ORDERIMPORT_MAPPINGS":
            return ["ID", "ADMINISTRATIVE_SITE_ID", "ADMINISTRATIVE_SITE_ID_EXT_CODE", "INTERFACE", "TYPE", "SOURCE", "DESTINATION", "NODE", "DATATYPE"];
        case "EXT_IF_ORDERIMPORT_ROUTINES":
            return ["ID", "ADMINISTRATIVE_SITE_ID", "ADMINISTRATIVE_SITE_ID_EXT_CODE", "INTERFACE", "TYPE", "FILENAME", "PATH", "WCFADDRESS", "COMPLETECUSTOMINTERFACE", "COREPOSTCALLENABLED", "COREPRECALLENABLED", "ORDERNODE", "ITEMNODE", "GRNODE", "CODINGNODE"];
        case "IA_CONFIG":
            return ["ID", "ADMINISTRATIVE_SITE_ID", "ADMINISTRATIVE_SITE_ID_EXT_CODE", "CODING_ROW_RESPECT_SEALED", "CALC_TAX_ENABLED", "EXT_VALIDATION_ENABLED", "ROW_APPROVAL_ALLOCATION_MODE", "USE_GROSS_SUMS", "USE_ORG_SUMS", "REQUIRE_COMPLETE_CODING", "ALLOWED_CODING_TOLERANCE", "BACKUP_HANDLING_MODE", "BATCH_VALIDATION_DISABLED", "IGNORE_ROW_RECIPIENT_CHECK", "TRIGGER_ROW_EXT_GENERIC_ANYERP", "VERIAN_TRANSFER_IN_USE", "EXTERNAL_VIEWER_TIME_OFFSET", "GENERATE_PREBOOK_VOUCHER_NUMBER", "POST_IMPORT_PROCESS_ENABLED", "ASYNC_INVOICE_REMOVE"];
        case "IA_ACTION_SETTINGS":
            return ["ID", "ADMINISTRATIVE_SITE_ID", "ADMINISTRATIVE_SITE_ID_EXT_CODE", "ACTION", "SETTING", "VALUE"];
        case "ADM_EMAIL_TYPE":
            return ["ID", "PRODUCT_ID", "TYPE", "NAME", "SENDER_NAME_OVERRIDE", "SENDER_ADDRESS_OVERRIDE"];
        case "PURCHASE_CONFIG":
            return ["ID", "ADMINISTRATIVE_SITE_ID", "ADMINISTRATIVE_SITE_ID_EXT_CODE", "ADV_VALIDATION_IS_ENABLED", "ADV_VALIDATION_IS_INHERITED", "ADV_BUDGET_CHECK_IS_ENABLED", "ADV_BUDGET_CHECK_IS_INHERITED", "DIM_SELF_APPROVE_IS_ENABLED", "DIM_SELF_APPROVE_IS_INHERITED", "BACKUP_HANDLING_MODE", "PR_ENRICHMENT_IS_ENABLED", "PR_ENRICHMENT_IS_INHERITED", "OPEN_API_PO_EXPORT_ENABLED", "OPEN_API_PO_EXPORT_INHERITED", "OPEN_API_PR_EXPORT_ENABLED", "OPEN_API_PR_EXPORT_INHERITED", "PO_ADV_VALIDATION_IS_ENABLED", "PO_ADV_VALIDATION_IS_INHERITED"];
        case "SCHEDULER_TASKS":
            return ["TaskId", "OrganizationElementId", "OrganizationElementId_EXT_CODE", "ProductCode", "TaskName", "TaskStatus", "TaskReference", "LastModifiedById", "LastModifiedByName", "Description", "TaskType", "CronExpression", "AuthenticationType", "UserName", "Password", "ParameterList", "IsOverridingCronExpression", "IsSystemTask", "ExternalCode", "PreventParallelExecution", "ParallelExecTimeLimit"];
        case "ORGANIZATION_ELEMENT":
            return ["Id", "ParentId", "Name", "Code", "Currency", "CountryCode", "DefaultUILanguage", "DefaultFormatLanguage", "ElementType", "IsAdministrativeSite", "DefaultLoginType", "DefaultDeliveryRecipientName", "BrowserLanguageAsDefault", "NotificationEmailSetting", "MandatorySuppBankAccount", "MandatorySuppBankName", "IsDefault", "IsDefaultForExternalUser", "Text1", "Text2", "Text3", "Text4", "Text5", "Text6", "Text7", "Text8", "Text9", "Text10", "Text11", "Text12", "Text13", "Int_1", "Int_2", "Int_3", "Int_4", "Int_5", "DefaultTimeZoneKey", "StructureId", "StructureLevel", "PurchaseEntityConfigId", "SortOrder", "ExternalCode"];
        case "ORGANIZATION_IDENTIFIER":
            return ["Id", "IdentifierKeyId", "IdentifierValue", "OrganizationElementId", "OrganizationElementId_EXT_CODE", "Inherit", "IsDefaultPartyID"];
        case "ORGANIZATION_ADDRESS":
            return ["Id", "OrganizationElementId", "OrganizationElementId_EXT_CODE", "Type", "Name", "Inherit"];
        case "ORGANIZATION_ADDRESS_PART":
            return ["Id", "PartKey", "PartValue", "AddressId"];
        default:
            console.warn("Tag inconnu / non trouve dans le XML : " + tagName);
            return [];
    }
}

function generateExtractOption(key, panel) {
    const firstDiv = document.createElement("div");
    firstDiv.classList.add("extractOptions");

    const tagSelect = document.createElement("select");
    for (const tag of getAllPossibleTagsForKey(key)) {
        const option = document.createElement("option");
        option.value = option.innerText = tag;
        tagSelect.appendChild(option);
    }

    firstDiv.appendChild(tagSelect);

    const operatorSelect = document.createElement("select");
    const option1 = document.createElement("option");
    option1.value = option1.innerText = "=";
    const option2 = document.createElement("option");
    option2.value = option2.innerText = "comme";

    operatorSelect.appendChild(option1);
    operatorSelect.appendChild(option2);
    firstDiv.appendChild(operatorSelect);

    const input = document.createElement("input");
    input.placeholder = "Valeur à conserver ...";
    firstDiv.appendChild(input);

    const span = document.createElement("span");
    span.innerText = "x";
    span.addEventListener("click", (e) => {
        e.currentTarget.parentNode.remove();
    }, false);
    firstDiv.appendChild(span);

    panel.appendChild(firstDiv);
}

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

function mapExtractOptions(HTMLSpecificValues) {
    let specificValues = {};

    for (const HTMLSpecificValue of HTMLSpecificValues) {
        const select = HTMLSpecificValue.getElementsByTagName("select");
        specificValues[select[0].options[select[0].selectedIndex].label] = {
            operator: select[1].options[select[1].selectedIndex].label,
            value: HTMLSpecificValue.getElementsByTagName("input")[0].value
        };
    }

    return specificValues;
} 

function canProcessDatas(key, datas) {
    const specificValues = mapExtractOptions(document.querySelectorAll(`div.extractOption[data-xml-name="${key}"] .extractOptions`));
    if (Object.keys(specificValues).length == 0) return true;

    for (const subKey of Object.keys(datas)) {
        if (Object.hasOwn(specificValues, subKey) && specificValues[subKey].operator == "=" && specificValues[subKey].value !== datas[subKey][0]) return false;
        if (Object.hasOwn(specificValues, subKey) && specificValues[subKey].operator == "comme" && datas[subKey][0].toLowerCase().indexOf(specificValues[subKey].value.toLowerCase()) == -1) return false;
    }

    return true;
}

function inspectFile(json, companyId, companyName) {
    const firstTag = Object.keys(json);
    const jsonBase = json[firstTag];
    const datas = generateFinalJsonBasicStructure();

    /* Invoice Process : START scanning */
    for (let i = 0; i < jsonBase.INVOICE_PROCESS_TABLE[0].INVOICE_PROCESS.length; i++) {
        if (
            jsonBase.INVOICE_PROCESS_TABLE[0].INVOICE_PROCESS[i].AdministrativeSiteId[0] == companyId &&
            canProcessDatas("INVOICE_PROCESS", jsonBase.INVOICE_PROCESS_TABLE[0].INVOICE_PROCESS[i])
        ) {
            datas.INVOICE_PROCESS.datas.push({... jsonBase.INVOICE_PROCESS_TABLE[0].INVOICE_PROCESS[i]});
            datas.INVOICE_PROCESS.temp += `pid*${jsonBase.INVOICE_PROCESS_TABLE[0].INVOICE_PROCESS[i].Id[0]}`;
        }
    }

    for (let i = 0; i < jsonBase.INVOICE_ACTIVITY_TABLE[0].INVOICE_ACTIVITY.length; i++) {
        if (
            datas.INVOICE_PROCESS.temp.indexOf(`pid*${jsonBase.INVOICE_ACTIVITY_TABLE[0].INVOICE_ACTIVITY[i].ProcessId[0]}`) !== -1 &&
            canProcessDatas("INVOICE_ACTIVITY", jsonBase.INVOICE_ACTIVITY_TABLE[0].INVOICE_ACTIVITY[i])
        ) {
            datas.INVOICE_ACTIVITY.datas.push({... jsonBase.INVOICE_ACTIVITY_TABLE[0].INVOICE_ACTIVITY[i]});
            datas.INVOICE_ACTIVITY.temp += `pac*${jsonBase.INVOICE_ACTIVITY_TABLE[0].INVOICE_ACTIVITY[i].Id[0]}`;
        }
    }

    for (let i = 0; i < jsonBase.INVOICE_RECIPIENTRESOLVER_TABLE[0].INVOICE_RECIPIENTRESOLVER.length; i++) {
        if (
            datas.INVOICE_ACTIVITY.temp.indexOf(`pac*${jsonBase.INVOICE_RECIPIENTRESOLVER_TABLE[0].INVOICE_RECIPIENTRESOLVER[i].ActivityId[0]}`) !== -1 &&
            canProcessDatas("INVOICE_RECIPIENTRESOLVER", jsonBase.INVOICE_RECIPIENTRESOLVER_TABLE[0].INVOICE_RECIPIENTRESOLVER[i])
        ) {
            datas.INVOICE_RECIPIENTRESOLVER.datas.push({... jsonBase.INVOICE_RECIPIENTRESOLVER_TABLE[0].INVOICE_RECIPIENTRESOLVER[i]});
        }
    }

    for (let i = 0; i < jsonBase.INVOICE_ACTIVITYPARAMETER_TABLE[0].INVOICE_ACTIVITYPARAMETER.length; i++) {
        if (
            datas.INVOICE_ACTIVITY.temp.indexOf(`pac*${jsonBase.INVOICE_ACTIVITYPARAMETER_TABLE[0].INVOICE_ACTIVITYPARAMETER[i].ActivityId[0]}`) !== -1 &&
            canProcessDatas("INVOICE_ACTIVITYPARAMETER", jsonBase.INVOICE_ACTIVITYPARAMETER_TABLE[0].INVOICE_ACTIVITYPARAMETER[i])
        ) {
            datas.INVOICE_ACTIVITY_PARAMETER.datas.push({... jsonBase.INVOICE_ACTIVITYPARAMETER_TABLE[0].INVOICE_ACTIVITYPARAMETER[i]});
        }
    }

    for (let i = 0; i < jsonBase.INVOICE_TRANSITION_TABLE[0].INVOICE_TRANSITION.length; i++) {
        if (
            datas.INVOICE_PROCESS.temp.indexOf(`pid*${jsonBase.INVOICE_TRANSITION_TABLE[0].INVOICE_TRANSITION[i].ProcessId[0]}`) !== -1 &&
            canProcessDatas("INVOICE_TRANSITION", jsonBase.INVOICE_TRANSITION_TABLE[0].INVOICE_TRANSITION[i])
        ) {
            datas.INVOICE_TRANSITION.datas.push({... jsonBase.INVOICE_TRANSITION_TABLE[0].INVOICE_TRANSITION[i]});
        }
    }

    /* Invoice Process : END scanning */

    /* System Mapping : START scanning */ 
    for (let i = 0; i < jsonBase.EXT_IF_BASICDATA_TABLE[0].EXT_IF_BASICDATA.length; i++) {
        if (
            jsonBase.EXT_IF_BASICDATA_TABLE[0].EXT_IF_BASICDATA[i].ADMINISTRATIVE_SITE_ID[0] == companyId &&
            canProcessDatas("EXT_IF_BASICDATA", jsonBase.EXT_IF_BASICDATA_TABLE[0].EXT_IF_BASICDATA[i])
        ) {
            datas.EXT_IF_BASICDATA.datas.push({... jsonBase.EXT_IF_BASICDATA_TABLE[0].EXT_IF_BASICDATA[i]});
            datas.EXT_IF_BASICDATA.temp += `extba*${jsonBase.EXT_IF_BASICDATA_TABLE[0].EXT_IF_BASICDATA[i].Id[0]}`;
        }
    }

    for (let i = 0; i < jsonBase.EXT_IF_BASICDATA_MAPPINGS_TABLE[0].EXT_IF_BASICDATA_MAPPINGS.length; i++) {
        if (
            jsonBase.EXT_IF_BASICDATA_MAPPINGS_TABLE[0].EXT_IF_BASICDATA_MAPPINGS[i].ADMINISTRATIVE_SITE_ID[0] == companyId &&
            canProcessDatas("EXT_IF_BASICDATA_MAPPINGS", jsonBase.EXT_IF_BASICDATA_MAPPINGS_TABLE[0].EXT_IF_BASICDATA_MAPPINGS[i])
        ) {
            datas.EXT_IF_BASICDATA_MAPPINGS.datas.push({... jsonBase.EXT_IF_BASICDATA_MAPPINGS_TABLE[0].EXT_IF_BASICDATA_MAPPINGS[i]});
        }
    }

    for (let i = 0; i < jsonBase.EXT_IF_BASICDATA_CHILDNODES_TABLE[0].EXT_IF_BASICDATA_CHILDNODES.length; i++) {
        if (
            jsonBase.EXT_IF_BASICDATA_CHILDNODES_TABLE[0].EXT_IF_BASICDATA_CHILDNODES[i].ADMINISTRATIVE_SITE_ID[0] == companyId &&
            canProcessDatas("EXT_IF_BASICDATA_CHILDNODES", jsonBase.EXT_IF_BASICDATA_CHILDNODES_TABLE[0].EXT_IF_BASICDATA_CHILDNODES[i])
        ) {
            datas.EXT_IF_BASICDATA_CHILDNODES.datas.push({... jsonBase.EXT_IF_BASICDATA_CHILDNODES_TABLE[0].EXT_IF_BASICDATA_CHILDNODES[i]});
        }
    }

    for (let i = 0; i < jsonBase.EXT_IF_TRANSFER_RESP_ROUTINES_TABLE[0].EXT_IF_TRANSFER_RESP_ROUTINES.length; i++) {
        if (
            jsonBase.EXT_IF_TRANSFER_RESP_ROUTINES_TABLE[0].EXT_IF_TRANSFER_RESP_ROUTINES[i].ADMINISTRATIVE_SITE_ID[0] == companyId &&
            canProcessDatas("EXT_IF_TRANSFER_RESP_ROUTINES", jsonBase.EXT_IF_TRANSFER_RESP_ROUTINES_TABLE[0].EXT_IF_TRANSFER_RESP_ROUTINES[i])
        ) {
            datas.EXT_IF_TRANSFER_RESP_ROUTINES.datas.push({... jsonBase.EXT_IF_TRANSFER_RESP_ROUTINES_TABLE[0].EXT_IF_TRANSFER_RESP_ROUTINES[i]});
        }
    }

    for (let i = 0; i < jsonBase.EXT_IF_TRANSFER_MAPPINGS_TABLE[0].EXT_IF_TRANSFER_MAPPINGS.length; i++) {
        if (
            jsonBase.EXT_IF_TRANSFER_MAPPINGS_TABLE[0].EXT_IF_TRANSFER_MAPPINGS[i].ADMINISTRATIVE_SITE_ID[0] == companyId &&
            canProcessDatas("EXT_IF_TRANSFER_MAPPINGS", jsonBase.EXT_IF_TRANSFER_MAPPINGS_TABLE[0].EXT_IF_TRANSFER_MAPPINGS[i])
        ) {
            datas.EXT_IF_TRANSFER_MAPPINGS.datas.push({... jsonBase.EXT_IF_TRANSFER_MAPPINGS_TABLE[0].EXT_IF_TRANSFER_MAPPINGS[i]});
        }
    }

    for (let i = 0; i < jsonBase.EXT_IF_TRANSFER_RESP_MAPPINGS_TABLE[0].EXT_IF_TRANSFER_RESP_MAPPINGS.length; i++) {
        if (
            jsonBase.EXT_IF_TRANSFER_RESP_MAPPINGS_TABLE[0].EXT_IF_TRANSFER_RESP_MAPPINGS[i].ADMINISTRATIVE_SITE_ID[0] == companyId &&
            canProcessDatas("EXT_IF_TRANSFER_RESP_MAPPINGS", jsonBase.EXT_IF_TRANSFER_RESP_MAPPINGS_TABLE[0].EXT_IF_TRANSFER_RESP_MAPPINGS[i])
        ) {
            datas.EXT_IF_TRANSFER_RESP_MAPPINGS.datas.push({... jsonBase.EXT_IF_TRANSFER_RESP_MAPPINGS_TABLE[0].EXT_IF_TRANSFER_RESP_MAPPINGS[i]});
        }
    }

    for (let i = 0; i < jsonBase.EXT_IF_TRANSFER_ROUTINES_TABLE[0].EXT_IF_TRANSFER_ROUTINES.length; i++) {
        if (
            jsonBase.EXT_IF_TRANSFER_ROUTINES_TABLE[0].EXT_IF_TRANSFER_ROUTINES[i].ADMINISTRATIVE_SITE_ID[0] == companyId &&
            canProcessDatas("EXT_IF_TRANSFER_ROUTINES", jsonBase.EXT_IF_TRANSFER_ROUTINES_TABLE[0].EXT_IF_TRANSFER_ROUTINES[i])
        ) {
            datas.EXT_IF_TRANSFER_ROUTINES.datas.push({... jsonBase.EXT_IF_TRANSFER_ROUTINES_TABLE[0].EXT_IF_TRANSFER_ROUTINES[i]});
        }
    }

    for (let i = 0; i < jsonBase.EXT_IF_ORDERIMPORT_MAPPINGS_TABLE[0].EXT_IF_ORDERIMPORT_MAPPINGS.length; i++) {
        if (
            jsonBase.EXT_IF_ORDERIMPORT_MAPPINGS_TABLE[0].EXT_IF_ORDERIMPORT_MAPPINGS[i].ADMINISTRATIVE_SITE_ID[0] == companyId &&
            canProcessDatas("EXT_IF_ORDERIMPORT_MAPPINGS", jsonBase.EXT_IF_ORDERIMPORT_MAPPINGS_TABLE[0].EXT_IF_ORDERIMPORT_MAPPINGS[i])
        ) {
            datas.EXT_IF_ORDERIMPORT_MAPPINGS.datas.push({... jsonBase.EXT_IF_ORDERIMPORT_MAPPINGS_TABLE[0].EXT_IF_ORDERIMPORT_MAPPINGS[i]});
        }
    }

        for (let i = 0; i < jsonBase.EXT_IF_ORDERIMPORT_ROUTINES_TABLE[0].EXT_IF_ORDERIMPORT_ROUTINES.length; i++) {
        if (
            jsonBase.EXT_IF_ORDERIMPORT_ROUTINES_TABLE[0].EXT_IF_ORDERIMPORT_ROUTINES[i].ADMINISTRATIVE_SITE_ID[0] == companyId &&
            canProcessDatas("EXT_IF_ORDERIMPORT_ROUTINES", jsonBase.EXT_IF_ORDERIMPORT_ROUTINES_TABLE[0].EXT_IF_ORDERIMPORT_ROUTINES[i])
        ) {
            datas.EXT_IF_ORDERIMPORT_ROUTINES.datas.push({... jsonBase.EXT_IF_ORDERIMPORT_ROUTINES_TABLE[0].EXT_IF_ORDERIMPORT_ROUTINES[i]});
        }
    }
    //TODO: continue 
    /* System Mapping : END scanning */

    // Faire un mapping des organisations pour ensuite reprendre les configs
    for (let i = 0; i < jsonBase.ORGANIZATION_TREE_TABLE[0].ORGANIZATION_ELEMENTS[0].ORGANIZATION_ELEMENT.length; i++) {
        if (
            jsonBase.ORGANIZATION_TREE_TABLE[0].ORGANIZATION_ELEMENTS[0].ORGANIZATION_ELEMENT[i].Name[0] == companyName &&
            canProcessDatas("ORGANIZATION_ELEMENT", jsonBase.ORGANIZATION_TREE_TABLE[0].ORGANIZATION_ELEMENTS[0].ORGANIZATION_ELEMENT[i])
        ) {
            datas.ORGANIZATION_ELEMENTS.datas.push({... jsonBase.ORGANIZATION_TREE_TABLE[0].ORGANIZATION_ELEMENTS[0].ORGANIZATION_ELEMENT[i]});
            if (jsonBase.ORGANIZATION_TREE_TABLE[0].ORGANIZATION_ELEMENTS[0].ORGANIZATION_ELEMENT[i].PurchaseEntityConfigId !== undefined)
                datas.ORGANIZATION_ELEMENTS.temp += `pec*${jsonBase.ORGANIZATION_TREE_TABLE[0].ORGANIZATION_ELEMENTS[0].ORGANIZATION_ELEMENT[i].PurchaseEntityConfigId[0]}`;
        }
    }

    /* Entity Mapping : START scanning */
    
    for (let i = 0; i < jsonBase.CMN_ENTITY_CONFIG_TABLE[0].CMN_ENTITY_CONFIG.length; i++) {
        if (
            datas.ORGANIZATION_ELEMENTS.temp.indexOf(`pec${jsonBase.CMN_ENTITY_CONFIG_TABLE[0].CMN_ENTITY_CONFIG[i].ID[0]}`) != -1 &&
            canProcessDatas("CMN_ENTITY_CONFIG", jsonBase.CMN_ENTITY_CONFIG_TABLE[0].CMN_ENTITY_CONFIG[i])
        ) {
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

function generateGlobalHistoricFile(json) {
    const chosedOrganizations = document.querySelectorAll(".organizationSelected[data-chosed='1']");
    const finalResult = [];

    for (const chosedOrganizationsHTML of chosedOrganizations) {
        finalResult.push(inspectFile(json, chosedOrganizationsHTML.getAttribute("data-id"), chosedOrganizationsHTML.getAttribute("data-name")));
    }

    return formatHistoricJSONAfterTreatment(preFormatageHistoric(finalResult));
}
