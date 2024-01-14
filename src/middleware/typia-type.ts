import typia from 'typia';
import { type UserSettings } from '../type/user-type.js';

export const isString = typia.createEquals<string>();

export const isUserSettingsettings = typia.createEquals<UserSettings>();

export const stringifyUserSettings = typia.json.createStringify<UserSettings>();

export const parseUserSettings = typia.json.createIsParse<UserSettings>();
