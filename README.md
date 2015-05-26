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

## License

MIT-licensed. See LICENSE.
