import React, { useState, useEffect } from 'react';

import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
import { defaultArticleState, ArticleStateType } from '../../constants/articleProps';

import styles from '../../styles/index.module.scss';

/**
 * Главный компонент приложения.
 * Отвечает за хранение и применение глобальных настроек статьи.
 */
export const App: React.FC = () => {
  /**
   * 1) Глобальное состояние для настроек статьи.
   * Хранит текущие параметры: шрифт, размер, цвета, ширину контента.
   */
  const [articleSettings, setArticleSettings] = useState<ArticleStateType>(
    defaultArticleState
  );

  /**
   * 2) При любом изменении articleSettings обновляем CSS-переменные на элементе <html>
   * Это позволяет динамически менять стили (шрифт, размер, цвет и т.д.) через переменные.
   */
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty(
      '--font-family',
      articleSettings.fontFamilyOption.value
    );
    root.style.setProperty(
      '--font-size',
      articleSettings.fontSizeOption.value
    );
    root.style.setProperty(
      '--font-color',
      articleSettings.fontColor.value
    );
    root.style.setProperty(
      '--bg-color',
      articleSettings.backgroundColor.value
    );
    root.style.setProperty(
      '--container-width',
      articleSettings.contentWidth.value
    );
  }, [articleSettings]);

  return (
    /**
     * Основной рендер приложения: обёртка <main> с классом из CSS-модуля
     * внутри располагаются панель настроек и сама статья.
     */
    <main className={styles.main}>
      {/* Компонент панели настроек принимает текущие параметры и колбек для их обновления */}
      <ArticleParamsForm
        initialSettings={articleSettings}
        onApply={setArticleSettings}
      />

      {/* Компонент отображения статьи, стилизованный по текущим настройкам */}
      <Article />
    </main>
  );
};