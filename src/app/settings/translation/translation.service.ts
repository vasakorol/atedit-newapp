import {Injectable} from '@angular/core';
import {StorageKeys, StorageService} from '../../services/storage.service';
import {ReplaySubject} from 'rxjs';
import {Translation, Translations} from './translation';
import * as uuiv4 from 'uuid/v4';
import {locale as localeEn} from './i18n/en';
import {TranslateService} from '@ngx-translate/core';
import {AppConfig} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private readonly translationsStream = new ReplaySubject<Translations[]>(1);
  public translations = this.translationsStream.asObservable();

  private readonly translationStream = new ReplaySubject<Translation>(1);
  public translation = this.translationStream.asObservable();

  private translationsList: Translations[] = [];
  private selectedTranslation: Translation = null;

  constructor(
    private readonly storageService: StorageService,
    private readonly translateService: TranslateService
  ) {
    if (AppConfig.environment === 'LOCAL') {
      this.updateDefaultTranslation();
    }
    this.getTranslations();
    this.getTranslation();
  }

  public getTranslations() {
    this.translationsList = this.storageService.get<Translations[]>(
      StorageKeys.storageTranslationKey
    );
    if (!this.translationsList) {
      this.translationsList = this.generateDefault();
    }
    this.translationsStream.next(this.translationsList);
  }

  public translationLoading() {
    const defaultLanguage = this.translationsList.find(item => item.default);
    const selectedLanguage = this.translationsList.find(item => item.selected);
    const languages = [];
    this.translationsList.forEach(translations => {
      const translation = this.getTranslationById(translations.id);
      this.translateService.setTranslation(
        translation.code.toLowerCase(),
        translation.translation,
        true
      );
      languages.push(translation.code.toLowerCase());
    });
    this.translateService.addLangs(languages);
    this.translateService.setDefaultLang(defaultLanguage.code.toLowerCase());
    this.translateService.use(
      selectedLanguage
        ? selectedLanguage.code.toLowerCase()
        : defaultLanguage.code.toLowerCase()
    );
  }

  public getTranslation(id?: string): void {
    if (!id) {
      let selected = this.translationsList.find(item => item.selected);
      if (!selected) {
        selected = this.translationsList.find(item => item.default);
      }
      id = selected.id;
    }
    this.selectedTranslation = this.storageService.get<Translation>(id);
    this.translationStream.next(this.selectedTranslation);
    this.translateService.use(this.selectedTranslation.code.toLowerCase());
  }

  public selected(id: string) {
    const saved = this.getById(id);
    if (saved) {
      this.translationsList.forEach(item => (item.selected = false));
      this.translationsList[
        this.translationsList.indexOf(saved)
      ].selected = true;
      this.updateList();
      this.getTranslation(saved.id);
    }
  }

  public update(
    id: string,
    translations: Translations,
    file: string,
    uploadContent: any
  ): void {
    const saved = this.getById(id);
    if (saved.default || translations.default) {
      return;
    }
    translations.id = id;
    if (translations.selected) {
      this.translationsList.forEach(item => (item.selected = false));
    }
    if (saved) {
      this.translationsList[
        this.translationsList.indexOf(saved)
      ] = translations;
    } else {
      this.translationsList.push(translations);
    }
    this.updateList();
    this.updateTranslation(translations, file, uploadContent);
    this.translationLoading();
  }

  public add(
    translations: Translations,
    file: string,
    uploadContent: any
  ): void {
    translations.id = uuiv4();
    translations.default = false;
    if (translations.selected) {
      this.translationsList.forEach(item => (item.selected = false));
    }
    this.translationsList.push(translations);
    this.updateList();
    this.updateTranslation(translations, file, uploadContent);
    this.translationLoading();
  }

  public remove(translations: Translations): void {
    if (translations.default) {
      return;
    }
    const index = this.translationsList.indexOf(translations, 0);
    if (index > -1) {
      this.translationsList.splice(index, 1);
    }
    this.storageService.remove(translations.id);
    this.updateList();
    this.translationLoading();
  }

  public getTranslationById(id: string): Translation {
    return this.storageService.get<Translation>(id);
  }

  private getById(id: string): Translations {
    return this.translationsList.find(item => item.id === id);
  }

  private updateList(): void {
    this.storageService.set(
      StorageKeys.storageTranslationKey,
      this.translationsList
    );
    this.translationsStream.next(this.translationsList);
  }

  private updateTranslation(
    translations: Translations,
    file: string,
    uploadContent: any
  ): void {
    let translation = this.storageService.get<Translation>(translations.id);
    if (translation) {
      translation.name = translations.name;
      translation.code = translations.code;
      translation.file = file;
      if (uploadContent) {
        translation.translation = uploadContent;
      }
    } else {
      translation = {
        id: translations.id,
        name: translations.name,
        code: translations.code,
        file,
        default: false,
        translation: uploadContent,
      };
    }
    this.storageService.set<Translation>(translation.id, translation);
    if (translations.selected) {
      this.selectedTranslation = translation;
      this.translationStream.next(this.selectedTranslation);
    }
  }

  private generateDefault(): Translations[] {
    const translations: Translations = {
      id: '0288d377-4436-4a93-a1e8-3627117fbeb3',
      name: 'English',
      code: 'en',
      selected: true,
      default: true,
    };
    this.storageService.set<Translations[]>(StorageKeys.storageTranslationKey, [
      translations,
    ]);
    this.updateDefaultTranslation();
    return [translations];
  }

  private updateDefaultTranslation(): void {
    const translation: Translation = {
      id: '0288d377-4436-4a93-a1e8-3627117fbeb3',
      name: 'English',
      code: 'en',
      file: 'en.json',
      default: true,
      translation: localeEn,
    };
    this.storageService.set<Translation>(
      '0288d377-4436-4a93-a1e8-3627117fbeb3',
      translation
    );
  }
}
