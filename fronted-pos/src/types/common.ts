export type RemovePrefix<OriginalKeys, Prefix extends string> = {
	[Key in keyof OriginalKeys as Key extends `${Prefix}${infer Rest}` ? Uncapitalize<Rest> : Key]: OriginalKeys[Key];
};
export type AddPrefix<OriginalKeys, Prefix extends string> = {
	[Key in keyof OriginalKeys as `${Prefix}${Key & string}`]: OriginalKeys[Key];
};
