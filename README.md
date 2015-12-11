# moz-scope
Check latest updates on MDN articles

## Installation

```bash
npm i -g moz-scope
```

If the installation finished, create `mozscope.conf` on your home directory, and write down URLs where you want to check updates:

```
https://developer.mozilla.org/ja/docs/Developer_Guide/How_to_Submit_a_Patch
https://developer.mozilla.org/en-US/docs/Mozilla/Developer_guide/How_to_Submit_a_Patch
https://developer.mozilla.org/ja/docs/Mozilla_Source_Code_Directory_Structure
https://developer.mozilla.org/en-US/docs/Mozilla/Developer_guide/Source_Code/Directory_structure
```

## Usage

Show any new updates on articles you specified in mozscope.conf

```bash
$ moz-scope
```

## Options

```
-h, --help     output usage information
-r, --reset    reset internal storage (not mozscope.conf)
-v, --version  output the version number
```
