import { generate } from 'astring';
import { format } from 'sql-formatter';

import isSqlQuery from '../utilities/isSqlQuery';

const create = (context) => {
  const placeholderRule = context.settings?.sql?.placeholderRule;

  const pluginOptions = context.options?.[0] || {};

  const ignoreExpressions = pluginOptions.ignoreExpressions === true;
  const ignoreInline = pluginOptions.ignoreInline !== false;
  const ignoreTagless = pluginOptions.ignoreTagless !== false;
  const startWithNewLine = pluginOptions.startWithNewLine !== false;
  const matchOuterIndentation = pluginOptions.matchOuterIndentation !== false;

  return {
    TemplateLiteral(node) {
      const tagName =
        node.parent.tag?.name ??
        node.parent.tag?.object?.name ??
        node.parent.tag?.callee?.object?.name;

      const sqlTagIsPresent = tagName === 'sql';

      if (ignoreTagless && !sqlTagIsPresent) {
        return;
      }

      if (ignoreExpressions && node.quasis.length !== 1) {
        return;
      }

      const magic = '"clap-eslint-plugin-sql"';

      const literal = node.quasis
        .map((quasi) => {
          return quasi.value.raw;
        })
        .join(magic);

      if (!sqlTagIsPresent && !isSqlQuery(literal, placeholderRule)) {
        return;
      }

      if (ignoreInline && !literal.includes('\n')) {
        return;
      }

      let formatted = format(literal, context.options[1]);

      if (matchOuterIndentation) {
        const sourceCode = context.getSourceCode();
        const tagLoc = sourceCode.getLocFromIndex(node.parent.tag.range[0]);
        const tagLine = sourceCode.lines[tagLoc.line - 1];
        const spaces = tagLine.match(/^ */)[0].length;

        const formattedLines = formatted.split('\n');
        formatted = formattedLines
          .map((line) => {
            return ' '.repeat(spaces) + line;
          })
          .join('\n');
      }

      // by default, sql-formatter trims the new line at the beginning of the query
      if (
        startWithNewLine
      ) {
        formatted = '\n' + formatted;
      }

      if (formatted !== literal) {
        context.report({
          fix: (fixer) => {
            let final = formatted;

            const expressionCount = node.expressions.length;
            let index = 0;

            while (index <= expressionCount - 1) {
              final = final.replace(
                magic,
                '${' + generate(node.expressions[index]) + '}',
              );

              index++;
            }

            return fixer.replaceTextRange(
              [
                node.quasis[0].range[0],
                node.quasis[node.quasis.length - 1].range[1],
              ],
              '`' + final + '`',
            );
          },
          message: 'Format the query',
          node,
        });
      }
    },
  };
};

export = {
  create,
  meta: {
    docs: {
      description:
        'Matches queries in template literals. Warns when query formatting does not match the configured format and fixes the formatting.',
      url: 'https://github.com/Clap404/eslint-plugin-sql#eslint-plugin-sql-rules-format',
    },
    fixable: 'code',
    schema: [
      {
        additionalProperties: false,
        properties: {
          ignoreExpressions: {
            default: false,
            type: 'boolean',
          },
          ignoreInline: {
            default: true,
            type: 'boolean',
          },
          startWithNewLine: {
            default: true,
            type: 'boolean',
          },
          ignoreTagless: {
            default: true,
            type: 'boolean',
          },
          matchOuterIndentation: {
            default: true,
            type: 'boolean',
          },
        },
        type: 'object',
      },
      {
        additionalProperties: false,
        properties: {
          language: {
            default: 'sql',
            type: 'string',
            enum: [
              'sql',
              'bigquery',
              'db2',
              'hive',
              'mariadb',
              'mysql',
              'n1ql',
              'plsql',
              'postgresql',
              'redshift',
              'singlestoredb',
              'snowflake',
              'spark',
              'sqlite',
              'transactsql',
              'tsql',
              'trino',
            ],
          },
          tabWidth: {
            default: 2,
            type: 'number',
          },
          useTabs: {
            default: false,
            type: 'boolean',
          },
          keywordCase: {
            default: 'preserve',
            type: 'string',
            enum: ['preserve', 'upper', 'lower'],
          },
          indentStyle: {
            default: 'standard',
            type: 'string',
            enum: ['standard', 'tabularLeft', 'tabularRight'],
          },
          logicalOperatorNewline: {
            default: 'before',
            type: 'string',
            enum: ['before', 'after'],
          },
          tabulateAlias: {
            default: false,
            type: 'boolean',
          },
          commaPosition: {
            default: 'after',
            type: 'string',
            enum: ['after', 'before', 'tabular'],
          },
          expressionWidth: {
            default: 50,
            type: 'number',
          },
          linesBetweenQueries: {
            default: 1,
            type: 'number',
          },
          denseOperators: {
            default: false,
            type: 'boolean',
          },
          newlineBeforeSemicolon: {
            default: false,
            type: 'boolean',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
};
