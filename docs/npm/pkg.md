# pkg

## install

```bash
npm install -g pkg
```

After installing it, run pkg --help without arguments to see list of options:

```bash
 blog git:(main) ✗ pkg -h

  pkg [options] <input>

  Options:

    -h, --help           output usage information
    -v, --version        output pkg version
    -t, --targets        comma-separated list of targets (see examples)
    -c, --config         package.json or any json file with top-level config
    --options            bake v8 options into executable to run with them on
    -o, --output         output file name or template for several files
    --out-path           path to save output one or more executables
    -d, --debug          show more information during packaging process [off]
    -b, --build          don't download prebuilt base binaries, build them
    --public             speed up and disclose the sources of top-level project
    --public-packages    force specified packages to be considered public
    --no-bytecode        skip bytecode generation and include source files as plain js
    --no-native-build    skip native addons build
    --no-dict            comma-separated list of packages names to ignore dictionaries. Use --no-dict * to disable all dictionaries
    -C, --compress       [default=None] compression algorithm = Brotli or GZip

  Examples:

  – Makes executables for Linux, macOS and Windows
    $ pkg index.js
  – Takes package.json from cwd and follows 'bin' entry
    $ pkg .
  – Makes executable for particular target machine
    $ pkg -t node14-win-arm64 index.js
  – Makes executables for target machines of your choice
    $ pkg -t node12-linux,node14-linux,node14-win index.js
  – Bakes '--expose-gc' and '--max-heap-size=34' into executable
    $ pkg --options "expose-gc,max-heap-size=34" index.js
  – Consider packageA and packageB to be public
    $ pkg --public-packages "packageA,packageB" index.js
  – Consider all packages to be public
    $ pkg --public-packages "*" index.js
  – Bakes '--expose-gc' into executable
    $ pkg --options expose-gc index.js
  – reduce size of the data packed inside the executable with GZip
    $ pkg --compress GZip index.js

```

## PKG_CACHE_PATH

`PKG_CACHE_PATH` Used to specify a custom path for node binaries cache folder. Default is `~/.pkg-cache`;

## pkg-fetch

https://github.com/vercel/pkg-fetch/releases
