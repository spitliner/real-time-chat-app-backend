import typia from 'typia';
import { type UserSettings } from '../type/user-type.js';
import { type IncomingEditMessageType, type IncomingMessageType } from '../type/message-type.js';

export const isString = typia.createEquals<string>();

export const isStringArray = typia.createEquals<string[]>();

export const isIncomingMessage = typia.createEquals<IncomingMessageType>();

export const isIncomingEditedMessage = typia.createEquals<IncomingEditMessageType>();

export const isUserSettingsettings = typia.createEquals<UserSettings>();

//------

export const stringifyUserSettings = typia.json.createStringify<UserSettings>();

export const stringifyContent = typia.json.createStringify<IncomingMessageType>();

export const stringifyEditedContent = typia.json.createStringify<IncomingEditMessageType>();

//------

export const parseUserSettings = typia.json.createIsParse<UserSettings>();
