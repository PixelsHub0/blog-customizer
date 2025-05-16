// src/index.tsx
import { createRoot } from 'react-dom/client';
import { StrictMode, useState, useEffect } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, ArticleStateType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const App = () => {
  // 1) Глобальный state для настроек статьи
  const [articleSettings, setArticleSettings] =
    useState<ArticleStateType>(defaultArticleState);

  // 2) При любом изменении settings — обновляем CSS-переменные на <html>
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--font-family',    articleSettings.fontFamilyOption.value);
    root.style.setProperty('--font-size',      articleSettings.fontSizeOption.value);
    root.style.setProperty('--font-color',     articleSettings.fontColor.value);
    root.style.setProperty('--bg-color',       articleSettings.backgroundColor.value);
    root.style.setProperty('--container-width', articleSettings.contentWidth.value);
  }, [articleSettings]);

  return (
    <main className={clsx(styles.main)}>
      <ArticleParamsForm
        initialSettings={articleSettings}
        onApply={setArticleSettings}
      />
      <Article />
    </main>
  );
};

const domNode = document.getElementById('root')!;
const root = createRoot(domNode);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
