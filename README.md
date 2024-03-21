# Caffeine-Typed

Template to create typescript rotations for [Caffeine](https://caffeine.pm)

## Installation

[Node.js](https://nodejs.org) \
[pnpm](https://pnpm.io/installation) \
[vscode](https://code.visualstudio.com)

Install dependencies

```bash
pnpm i
```

Choose a project name and change 'changeme' to it

- In file 'package.json' there are two 'PROJECT_NAME=changeme'

I advise you to create a symlink between the dist folder and a folder for the project in caffeine/scripts/

```bash
pnpm i
```

To keep your nodejs dependencies automatically updated, use:
[renovabot](https://github.com/apps/renovate)

## Usage

Development build with Hot Reload

```bash
pnpm dev
```

Production build

```bash
pnpm build
```

Clean build folder

```bash
pnpm clean
```

## Documentation

[TypescriptToLua](https://typescripttolua.github.io) \
[Caffeine](https://docs.caffeine.cx)

## Deployment

To deploy your project on Caffeine you need to create a new repository which will hold your project transpiled code.

Then change in '.github/workflows/CD.yml'

- 'joao-fidalgo' to your github username
- 'caffeine-typed-build' to your target repository
- 'joao-fidalgo@users.noreply.github.com' to your email

And create a [github secret](https://github.com/settings/tokens) for the repository and store it with the name 'API_TOKEN_GITHUB'

## Support

For support, DM vibe6365 on discord.
