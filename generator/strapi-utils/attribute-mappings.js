export const STRAPI_ATTRIBUTE_TYPES = {
    STRING: 'string',
    MEDIA: 'media',
    INTEGER: 'integer',
    BIGINTEGER: 'biginteger',
    DECIMAL: 'decimal',
    FLOAT: 'float',
    RELATION: 'relation',
    BOOLEAN: 'boolean',
}

export const attributeToInterfaceProperty = (attribute, name) => {
    const {
        type,
        required,
        multiple
    } = attribute;
    let builtAttribute = name;
    if (!required || type === STRAPI_ATTRIBUTE_TYPES.RELATION) {
        builtAttribute += '?';
    }
    builtAttribute += ': ';

    switch (type) {
    case STRAPI_ATTRIBUTE_TYPES.STRING:
        builtAttribute += 'string'
        break;

    case STRAPI_ATTRIBUTE_TYPES.MEDIA:
        if (multiple) {
            builtAttribute += 'IStrapiResponse<IStrapiEntity<IStrapiFile>[]>'
        } else {
            builtAttribute += 'IStrapiResponse<IStrapiEntity<IStrapiFile>>'
        }
        break;

    case STRAPI_ATTRIBUTE_TYPES.BOOLEAN:
        builtAttribute += 'boolean'
        break;

    case STRAPI_ATTRIBUTE_TYPES.INTEGER:
    case STRAPI_ATTRIBUTE_TYPES.BIGINTEGER:
    case STRAPI_ATTRIBUTE_TYPES.DECIMAL:
    case STRAPI_ATTRIBUTE_TYPES.FLOAT:
        builtAttribute += 'number';
        break;

    case STRAPI_ATTRIBUTE_TYPES.RELATION:
        builtAttribute += 'any // TODO Add the correct import for this relation'
        break;

    default:
        builtAttribute += 'any'
    }
    return builtAttribute;
}
