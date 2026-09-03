# Repository Guidelines

## Project Structure & Module Organization

This repository is currently organized as a two-part application:

- `backend/` contains server-side application code, API handlers, and backend-specific tests.
- `frontend/` contains the client application, UI assets, and frontend-specific tests.
- `.gitignore` excludes the root `.env` file.

Both application directories are currently empty. Keep code, configuration, and tests within the relevant directory, and document any new top-level directory in this guide or the project README. Prefer feature-based subdirectories once a component grows beyond a few files.

## Build, Test, and Development Commands

No build system, package manifest, or test runner has been committed yet. When adding one, expose predictable commands from the appropriate application directory and update this section. Recommended command names are:

- `npm run dev` — start the application in development mode.
- `npm test` — run the automated test suite.
- `npm run lint` — check formatting and static-analysis rules.
- `npm run build` — produce a release-ready build.

Do not claim a change is verified until the corresponding command exists and passes locally.

## Coding Style & Naming Conventions

Follow the formatter and linter configured within each application. Until those tools are added, use consistent indentation within each language, UTF-8 files, and a final newline. Use descriptive names: `PascalCase` for UI components and classes, `camelCase` for JavaScript or TypeScript functions and variables, and `snake_case` for Python modules and functions. Avoid placing shared code in ambiguous `utils` modules; name modules after their responsibility.

## Testing Guidelines

Add tests alongside a new feature or in a clearly named `tests/` directory. Name tests after observable behavior, for example `test_generates_chapter_audio.py` or `AudioPlayer.test.tsx`. Cover success paths, invalid input, and external-service failures. Mock network and text-to-speech providers so tests remain deterministic and do not consume paid services.

## Commit & Pull Request Guidelines

The Git history currently contains only `Initial Commit`, so no established convention exists. Use short, imperative commit subjects such as `Add chapter segmentation`. Keep commits focused.

Pull requests should describe the change, explain how it was tested, and link relevant issues. Include screenshots or recordings for visible frontend changes and note configuration, migration, or API-contract changes explicitly.

## Security & Configuration

Never commit `.env`, API keys, generated audio containing sensitive material, or provider credentials. Add a sanitized `.env.example` when configuration variables are introduced, and document each variable without including real secrets.
