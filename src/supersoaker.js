#!/usr/bin/env node

/* eslint no-console: 0, no-process-exit: 0 */
'use strict';

var npm = require('npm');
var yargs = require('yargs');

var defaultRegistry = 'https://registry.npmjs.org';
var args = yargs
    .usage('Usage: $0 [options]')
    .command('squirt', 'Squirt the passed details into your npmrc file')
    .alias('r', 'registry')
    .nargs('r', 1)
    .describe('r', 'Registry URL')
    .alias('u', 'user')
    .nargs('u', 1)
    .describe('u', 'Username')
    .alias('p', 'password')
    .nargs('p', 1)
    .describe('p', 'Password')
    .alias('e', 'email')
    .nargs('e', 1)
    .describe('e', 'User email')
    .help('h')
    .alias('h', 'help')
    .argv;

var registry = args.registry || process.env.NPM_REGISTRY,
    user = args.user || process.env.NPM_USER,
    pass = args.password || process.env.NPM_PASSWORD,
    email = args.email || process.env.NPM_EMAIL;

if (!user) {
    console.error('User not specified through CLI/environment vars');
    process.exit(1);
}

if (!pass) {
    console.error('Passworrd not specified through CLI/environment vars');
    process.exit(1);
}

if (!email) {
    console.error('Email not specified through CLI/environment vars');
    process.exit(1);
}

npm.load({}, function(loadErr) {
    if (loadErr) {
        throw loadErr;
    }

    if (registry) {
        npm.config.set('registry', registry, 'user');
    }

    npm.config.set('email', email, 'user');

    var reg = registry || defaultRegistry;
    var auth = {
        username: user,
        password: pass,
        email: email
    };

    npm.registry.adduser(reg, { auth: auth }, function(err, doc) {
        if (err && err.statusCode === 409) {
            console.error('User already exists - incorrect password?');
            process.exit(1);
        }

        if (err && [401, 403].indexOf(err.statusCode) > -1) {
            console.error('Incorrect username/password');
            process.exit(1);
        }

        if (err) {
            throw err;
        }

        if (doc && doc.token) {
            npm.config.setCredentialsByURI(reg, {
                token: doc.token
            });
        } else {
            console.error('No auth token received from npm.adduser');
            process.exit(1);
        }

        npm.config.save('user', function(saveErr) {
            if (saveErr) {
                throw saveErr;
            }
        });
    });
});

