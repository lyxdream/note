# element-plus的总包package.json

```json
{
  "private": true,
  "packageManager": "pnpm@7.2.1",
  "workspaces": [
    "packages/*",
    "play",
    "docs"
  ],
  "scripts": {
    "cz": "git-cz",
    "test": "vitest",
    "test:coverage": "vitest --coverage",
    "test:ssr": "vitest --config ./ssr-testing/vitest.config.ts",
    "prepare:e2e": "if [ ! -d \"docs/.vitepress/dist\" ]; then pnpm run docs:build; fi;",
    "dev": "pnpm -C play dev",
    "gen": "bash ./scripts/gc.sh",
    "gen:version": "tsx scripts/gen-version.ts",
    "diff:table": "tsx scripts/build-table.ts",
    "update:version": "tsx scripts/update-version.ts",
    "clean": "pnpm run clean:dist && pnpm run -r --parallel clean",
    "clean:dist": "rimraf dist",
    "build": "pnpm run -C internal/build start",
    "build:theme": "pnpm run -C packages/theme-chalk build",
    "format": "prettier --write .",
    "lint": "eslint . --ext .vue,.js,.ts,.jsx,.tsx,.md,.json --max-warnings 0 && pretty-quick --check --branch dev",
    "lint:fix": "eslint --fix . --ext .vue,.js,.ts,.jsx,.tsx,.md,.json && pretty-quick --branch dev",
    "lint:commit": "commitlint --from $(git merge-base origin/dev HEAD) --to HEAD > ./commit-lint.txt",
    "typecheck": "run-p typecheck:node typecheck:vite-config",
    "typecheck:web": "vue-tsc -p tsconfig.web.json --composite false --noEmit",
    "typecheck:node": "tsc -p tsconfig.node.json --noEmit",
    "typecheck:play": "vue-tsc -p tsconfig.play.json --composite false --noEmit",
    "typecheck:vite-config": "vue-tsc -p tsconfig.vite-config.json --composite false --noEmit",
    "typecheck:vitest": "vue-tsc -p tsconfig.vitest.json --composite false --noEmit",
    "docs:dev": "pnpm run -C docs dev",
    "docs:build": "pnpm run -C docs build",
    "docs:serve": "pnpm run -C docs serve",
    "docs:gen-locale": "pnpm run -C docs gen-locale",
    "docs:crowdin-credentials": "pnpm run -C docs crowdin-credentials",
    "stub": "pnpm run -r --parallel stub",
    "prepare": "husky install",
    "postinstall": "pnpm stub && concurrently \"pnpm gen:version\" \"pnpm run -C internal/metadata dev\""
  },
  "peerDependencies": {
    "vue": "^3.2.0"
  },
  "dependencies": {
  },
  "devDependencies": {
  },
  "engines": {
    "node": ">= 16"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-git"
    }
  },
  "pnpm": {
    "peerDependencyRules": {
      "ignoreMissing": [
        "vite",
        "react",
        "react-dom"
      ]
    }
  },
  "lint-staged": {
    "*.{vue,js,ts,jsx,tsx,md,json}": "eslint --fix"
  }
}

```
- private:true 私有仓库
- packageManager:包管理器
- workspaces 


> repository（代码存储位置）

