# supersoaker

Add custom npm registry + user credentials to `.npmrc` based on environment variables or CLI options.

## Disclaimer

I take absolutely NO responsibility if this should destroy your `.npmrc` or lead to some security vurnerability (exposing raw username/passwords in CI-environments or whatnot).

## Installing

```
npm install -g supersoaker
```

## Basic usage

```
Usage: supersoaker [options]

Commands:
  squirt  Squirt the passed details into your npmrc file

Options:
  -r, --registry  Registry URL
  -u, --user      Username
  -p, --password  Password
  -e, --email     User email
  -h, --help      Show help

Example:

  supersoaker squirt -r http://some.registry -u username -p password -e e@mail.com

```

## Environment variables

These are alternatives to specifying CLI options:

* `NPM_REGISTRY` - Registry URL (eg. `https://registry.npmjs.org`)
* `NPM_USER`     - Registry username
* `NPM_PASSWORD` - Registry password
* `NPM_EMAIL`    - User email address

## License

MIT-licensed. See LICENSE.
