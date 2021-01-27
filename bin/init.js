#!/usr/bin/env node

const path    = require( 'path' );
const fs      = require( 'fs' );
const prompt  = require( 'prompt-sync' )();
const replace = require( 'replace-in-file' );
const rootDir = path.resolve( __dirname, '..' );

// Helpers
const fgRed     = '\x1b[31m';
const fgGreen   = '\x1b[32m';
const fgBlue    = '\x1b[34m';
const fgMagenta = '\x1b[35m';
const fgCyan    = '\x1b[36m';

// Functions
const consoleOutput = ( color, text ) => {
	console.log( color, text );
};

const findReplace = ( findString, replaceString ) => {
	const regex = new RegExp( findString, 'g' );
	const options = {
		files: `${rootDir}/**/*`,
		from: regex,
		to: replaceString,
		ignore: [
			`${rootDir}/node_modules/**/*`,
			`${rootDir}/.git/**/*`,
			`${rootDir}/.github/**/*`,
			`${rootDir}/vendor/**/*`,
			`${rootDir}/bin/init.js`
		]
	};

	try {
		const changes = replace.sync( options );
		consoleOutput( fgGreen, `${findString}-> ${replaceString}. Modified files: ${changes.join( ', ' )}` );
	} catch ( error ) {
		console.error( 'Error occurred:', error );
	}
};

// Main script
consoleOutput( fgGreen, 'The script will uniquely set up your plugin.' );
consoleOutput( fgGreen, '* - required' );

// Plugin name
consoleOutput( fgGreen, 'Please enter your plugin name (shown in WordPress admin)*:' );

let pluginName;
do {
	consoleOutput( fgGreen, '' );
	pluginName = prompt( 'Plugin name: ' );

	if ( null !== pluginName && pluginName.length ) {
		pluginName = pluginName.trim();
	} else {
		consoleOutput( fgRed, 'Plugin name field is required and cannot be empty.' );
	}
} while ( 0 >= pluginName.length );

// Plugin Version.
const pluginVersion = '1.0.0';

const lowerPluginName = pluginName.toLowerCase().trim();
const lowerWithHyphen = lowerPluginName.replace( /\W+/g, '-' ).trim();
const lowerWithUnderscore = lowerPluginName.replace( /\W+/g, '_' ).trim();
const lowerPrefixWithHyphen = lowerWithHyphen + '-';
const lowerPrefixWithunderscore = lowerWithUnderscore + '_';

const camelCasePluginName = pluginName.replace( /\w\S*/g, function ( txt ) {
	return txt.charAt( 0 ).toUpperCase() + txt.substr( 1 ).toLowerCase();
} );
const camelCaseWithHyphen = camelCasePluginName.replace( /\W+/g, '-' ).trim();
const camelCaseWithUnderscore = camelCasePluginName.replace( /\W+/g, '_' ).trim();
const camelCasePrefixWithHyphen = camelCaseWithHyphen + '-';
const camelCasePrefixWithUnderscore = camelCaseWithUnderscore + '_';

const upperPluginName = pluginName.toUpperCase().trim();
const upperWithHyphen = upperPluginName.replace( /\W+/g, '-' ).trim();
const upperWithUnderscore = upperPluginName.replace( /\W+/g, '_' ).trim();
const upperPrefixWithHyphen = upperWithHyphen + '-';
const upperPrefixWithUnderscore = upperWithUnderscore + '_';

// Plugin Constants.
const pluginVersionConst = `${upperWithUnderscore}_VERSION`;
const pluginDirConst = `${upperWithUnderscore}_TEMP_DIR`;
const pluginBuildDirConst = `${upperWithUnderscore}_BUILD_DIR`;
const pluginBuildDirURIConst = `${upperWithUnderscore}_BUILD_URI`;

consoleOutput( fgCyan, '----------------------------------------------------' );
consoleOutput( fgGreen, 'Plugin details will be:' );

consoleOutput( fgMagenta, `Plugin name: ${pluginName}` );
consoleOutput( fgMagenta, `Plugin version: ${pluginVersion}` );
consoleOutput( fgMagenta, `Text domain: ${lowerWithHyphen}` );
consoleOutput( fgMagenta, `Package: ${pluginName}` );
consoleOutput( fgMagenta, `Namespace: ${camelCaseWithUnderscore}` );
consoleOutput( fgMagenta, `Function prefix: ${lowerPrefixWithunderscore}` );
consoleOutput( fgMagenta, `CSS class prefix: ${lowerPrefixWithHyphen}` );
consoleOutput( fgMagenta, `PHP variable: ${lowerPrefixWithunderscore}` );
consoleOutput( fgMagenta, `Version constant: ${pluginVersionConst}` );
consoleOutput( fgMagenta, `Directory constant: ${pluginDirConst}` );
consoleOutput( fgMagenta, `Build directory Path constant: ${pluginBuildDirConst}` );
consoleOutput( fgMagenta, `Build directory URI constant: ${pluginBuildDirURIConst}` );

const confirm = prompt( 'Confirm? (y/n) ' ).trim();

if ( 'y' === confirm ) {
	consoleOutput( fgGreen, 'This might take some time...' );

	findReplace( 'Blank Plugin', pluginName );
	findReplace( 'Blank plugin', lowerPluginName );

	findReplace( 'Version:           1.0.0', 'Version: ' + pluginVersion );
	findReplace( '"version": "1.0.0"', '"version": "' + pluginVersion + '"' );

	findReplace( 'Blank-Plugin-', camelCasePrefixWithHyphen );
	findReplace( 'Blank_Plugin_', camelCasePrefixWithUnderscore );

	findReplace( 'blank-plugin-', lowerPrefixWithHyphen );
	findReplace( 'blank_plugin_', lowerPrefixWithunderscore );

	findReplace( 'BLANK_PLUGIN_VERSION', pluginVersionConst );
	findReplace( 'BLANK_PLUGIN_TEMP_DIR', pluginDirConst );
	findReplace( 'BLANK_PLUGIN_BUILD_DIR', pluginBuildDirConst );
	findReplace( 'BLANK_PLUGIN_BUILD_URI', pluginBuildDirURIConst );

	findReplace( 'BLANK-PLUGIN-', upperPrefixWithHyphen );
	findReplace( 'BLANK_PLUGIN_', upperPrefixWithUnderscore );

	findReplace( 'BLANK-PLUGIN', upperWithHyphen );
	findReplace( 'BLANK_PLUGIN', upperWithUnderscore );

	findReplace( 'Blank-Plugin', camelCaseWithHyphen );
	findReplace( 'Blank_Plugin', camelCaseWithUnderscore );

	findReplace( 'blank-plugin', lowerWithHyphen );
	findReplace( 'blank_plugin', lowerWithUnderscore );

	const classBlankPluginAdminSearch = `${rootDir}/admin/class-blank-plugin-admin.php`;
	const classBlankPluginAdminReplace = `${rootDir}/admin/class-${lowerWithHyphen}-admin.php`;

	const blankPluginAdminDisplaySearch = `${rootDir}/admin/partials/blank-plugin-admin-display.php`;
	const blankPluginAdminDisplayReplace = `${rootDir}/admin/partials/${lowerWithHyphen}-admin-display.php`;

	const classBlankPluginPublicSearch = `${rootDir}/public/class-blank-plugin-public.php`;
	const classBlankPluginPublicReplace = `${rootDir}/public/class-${lowerWithHyphen}-public.php`;

	const blankPluginPublicDisplaySearch = `${rootDir}/public/partials/blank-plugin-public-display.php`;
	const blankPluginPublicDisplayReplace = `${rootDir}/public/partials/${lowerWithHyphen}-public-display.php`;

	const classBlankPluginSearch = `${rootDir}/includes/class-blank-plugin.php`;
	const classBlankPluginReplace = `${rootDir}/includes/class-${lowerWithHyphen}.php`;

	const classBlankPluginActivatorSearch = `${rootDir}/includes/class-blank-plugin-activator.php`;
	const classBlankPluginActivatorReplace = `${rootDir}/includes/class-${lowerWithHyphen}-activator.php`;

	const classBlankPluginDeactivatorSearch = `${rootDir}/includes/class-blank-plugin-deactivator.php`;
	const classBlankPluginDeactivatorReplace = `${rootDir}/includes/class-${lowerWithHyphen}-deactivator.php`;

	const classBlankPlugini18nSearch = `${rootDir}/includes/class-blank-plugin-i18n.php`;
	const classBlankPlugini18nReplace = `${rootDir}/includes/class-${lowerWithHyphen}-i18n.php`;

	const classBlankPluginLoaderSearch = `${rootDir}/includes/class-blank-plugin-loader.php`;
	const classBlankPluginLoaderReplace = `${rootDir}/includes/class-${lowerWithHyphen}-loader.php`;

	let allSearchReplace = {};
	allSearchReplace[classBlankPluginAdminSearch] = classBlankPluginAdminReplace;
	allSearchReplace[blankPluginAdminDisplaySearch] = blankPluginAdminDisplayReplace;
	allSearchReplace[classBlankPluginPublicSearch] = classBlankPluginPublicReplace;
	allSearchReplace[blankPluginPublicDisplaySearch] = blankPluginPublicDisplayReplace;
	allSearchReplace[classBlankPluginSearch] = classBlankPluginReplace;
	allSearchReplace[classBlankPluginActivatorSearch] = classBlankPluginActivatorReplace;
	allSearchReplace[classBlankPluginDeactivatorSearch] = classBlankPluginDeactivatorReplace;
	allSearchReplace[classBlankPlugini18nSearch] = classBlankPlugini18nReplace;
	allSearchReplace[classBlankPluginLoaderSearch] = classBlankPluginLoaderReplace;

	for ( let SingleSearch in allSearchReplace ) {
		if ( fs.existsSync( SingleSearch ) ) {
			fs.renameSync( SingleSearch, allSearchReplace[SingleSearch], ( err ) => {
				if ( err ) {
					throw err;
				}
				fs.statSync( allSearchReplace[SingleSearch], ( error, stats ) => {
					if ( error ) {
						throw error;
					}
					consoleOutput( fgBlue, `stats: ${JSON.stringify( stats )}` );
				} );
			} );
		}
	}

	consoleOutput( fgGreen, 'Renaming Successful!' );

} else {
	consoleOutput( fgRed, 'There was error renaming.' );
}
