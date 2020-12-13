# Design Doc

For the next version of this extension, with fully configurable component variants.

## Context menu

- Create Folder Component (default)
- Create Folder Component (selection)

## Exposed names

- $NAME
- $CAMEL_NAME
- $PASCAL_NAME
- $SNAKE_NAME
- $KEBAB_NAME

## Settings

```json
{
  "createfoldercomponent.defaultVariant": "ts-react-component",
  "createfoldercomponent.componentVariants": {
    "ts-react-component": {
      "name": "TypeScript React Component",
      "files": ["ts-index", "ts-component"]
    },
    "ts-react-component-style": {
      "name": "React component + style",
      "files": ["ts-index", "ts-component-with-scss", "scss-component"]
    },
    "ts-react-component-style-stories": {
      "name": "React component + style + stories",
      "files": ["ts-index", "ts-component-with-scss", "ts-story", "scss-component"]
    },
    "ts-react-component-stories": {
      "name": "React component + stories",
      "files": ["ts-index", "ts-component", "ts-story"]
    }
  },
  // "createfoldercomponent.componentVariants": {
  //   "React component": ["ts-index", "ts-component"],
  //   "React component + style": ["ts-index", "ts-component-with-scss", "scss-component"],
  //   "React component + style + stories": [
  //     "ts-index",
  //     "ts-component-with-scss",
  //     "ts-story",
  //     "scss-component"
  //   ],
  //   "React component + stories": ["ts-index", "ts-component", "ts-story"]
  // },
  "createfoldercomponent.fileTemplates": {
    "ts-index": {
      "filename": "index.ts",
      "contents": ["export { default } from './$NAME'"]
    },
    "ts-component": {
      "filename": "$NAME.tsx",
      "contents": [
        "interface $NAMEProps {}",
        "",
        "export default function $NAME({}: $NAMEProps) {",
        "  ",
        "}"
      ]
    },
    "ts-component-with-scss": {
      "filename": "$NAME.tsx",
      "contents": [
        "import styles from '$KEBAB_NAME.scss'",
        "",
        "interface $NAMEProps {}",
        "",
        "export default function $NAME({}: $NAMEProps) {",
        "  ",
        "}"
      ]
    },
    "ts-spec": {
      "filename": "$NAME.spec.tsx",
      "contents": [""]
    },
    "ts-story": {
      "filename": "$NAME.stories.tsx",
      "contents": [
        "import $NAME from './$NAME'",
        "",
        "export function main() {",
        "  return <$NAME />",
        "}"
      ]
    },
    "scss-component": {
      "filename": "$KEBAB_NAME.scss",
      "contents": [".$KEBAB_NAME {}"]
    }
  }
}
```
