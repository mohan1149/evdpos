import React from 'react';
import SunmiV2Printer from 'react-native-sunmi-v2-printer';

export async function printDashedLine() {
	await SunmiV2Printer.printOriginalText('------------------------------\n');
}
export async function printNextLine() {
	await SunmiV2Printer.printOriginalText('\n');
}

export async function feedPaper() {
	await SunmiV2Printer.printOriginalText('\n\n\n');
}

export async function printBoldText(text) {
	await SunmiV2Printer.setFontSize(40);
	await SunmiV2Printer.printOriginalText(text+'\n');
	await SunmiV2Printer.setFontSize(25);
}

export async function printTest() {
	await SunmiV2Printer.setFontSize(40);
	await SunmiV2Printer.printOriginalText('Print Test on Evd\n');
	await SunmiV2Printer.setFontSize(23);
	let columnAliment = [0, 1, 1, 1, 1];
	let columnWidth = [15, 1, 3, 1, 15];
	await SunmiV2Printer.printColumnsText(
		['Company', '|', 'Num', '|', 'Amount'],
		columnWidth,
		columnAliment,
	);
	let sales = [
		['Ooredoo', '|', '2', '|', '30.000'],
		['iTunes', '|', '4', '|', '40.400'],
		['Zain', '|', '6', '|', '120.250'],
		['Eureka', '|', '1', '|', '5.000'],
		['Xcite', '|', '2', '|', '45.300'],
		['FastTelco', '|', '3', '|', '15.800'],

	];
	await SunmiV2Printer.printOriginalText('--------------------------------\n');
	sales.forEach(async (item) => {
		await SunmiV2Printer.printColumnsText(
			item,
			columnWidth,
			columnAliment,
		);
	});
	await SunmiV2Printer.printOriginalText('--------------------------------\n');
	await SunmiV2Printer.printOriginalText('\n\n\n');
}


