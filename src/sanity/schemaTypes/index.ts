import type { SchemaTypeDefinition } from 'sanity'
import post from './post'
import author from './author'
import category from './category'
import blockContent from './blockContent'
import agency from './agency'
import event from './event'
import { localizedString, localizedText } from './localized'

// Next phases add: agency, event, masterclass, siteSettings, ...
export const schemaTypes: SchemaTypeDefinition[] = [post, author, category, blockContent, agency, event, localizedString, localizedText]
