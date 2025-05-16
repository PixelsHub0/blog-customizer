// src/components/article-params-form/ArticleParamsForm.tsx
import React, { useState, useRef, useEffect, useCallback, FormEvent } from 'react';
import { ArrowButton } from '../../ui/arrow-button';
import { Button } from '../../ui/button';
import { Select } from '../../ui/select';
import { RadioGroup } from '../../ui/radio-group';
import { Separator } from '../../ui/separator';
import { useOutsideClickClose } from '../../ui/select/hooks/useOutsideClickClose';
import {
  OptionType,
  defaultArticleState,
  ArticleStateType,
  fontFamilyOptions,
  fontSizeOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
} from '../../constants/articleProps';
import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
  initialSettings?: ArticleStateType;
  onApply?: (settings: ArticleStateType) => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
  initialSettings = defaultArticleState,
  onApply = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState<ArticleStateType>(initialSettings);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = useCallback(() => {
    setIsOpen(open => !open);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setFormState(initialSettings);
    }
  }, [isOpen, initialSettings]);

  useOutsideClickClose({
    isOpen,
    rootRef: sidebarRef,
    onChange: setIsOpen,
  });

  const updateField = useCallback(
    <K extends keyof ArticleStateType>(key: K, value: ArticleStateType[K]) => {
      setFormState(prev => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      onApply(formState);
    },
    [formState, onApply]
  );

  const handleReset = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      // Сброс к начальному состоянию при загрузке страницы
      setFormState(defaultArticleState);
      onApply(defaultArticleState);
    },
    [onApply]
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.toggleButtonWrapper}>
        <ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
      </div>

      <aside
        ref={sidebarRef}
        className={`${styles.container} ${isOpen ? styles.container_open : ''}`}
        aria-hidden={!isOpen}
      >
        {/* заголовок внутри панели */}
        <h2 className={styles.title}>Задайте параметры</h2>

        {isOpen && (
          <form
            className={styles.form}
            onSubmit={handleSubmit}
            onReset={handleReset}
            noValidate
          >
            {/* ШРИФТ */}
            <Select
              options={fontFamilyOptions}
              selected={formState.fontFamilyOption}
              onChange={opt => updateField('fontFamilyOption', opt)}
              title="Шрифт"
            />

            {/* РАЗМЕР ШРИФТА */}
            <RadioGroup
              name="fontSize"
              options={fontSizeOptions}
              selected={formState.fontSizeOption}
              onChange={opt => updateField('fontSizeOption', opt)}
              title="Размер шрифта"
            />

            {/* ЦВЕТ ШРИФТА */}
            <Select
              options={fontColors}
              selected={formState.fontColor}
              onChange={opt => updateField('fontColor', opt)}
              title="Цвет шрифта"
            />

            <Separator />

            {/* ЦВЕТ ФОНА */}
            <Select
              options={backgroundColors}
              selected={formState.backgroundColor}
              onChange={opt => updateField('backgroundColor', opt)}
              title="Цвет фона"
            />

            {/* ШИРИНА КОНТЕНТА */}
            <Select
              options={contentWidthArr}
              selected={formState.contentWidth}
              onChange={opt => updateField('contentWidth', opt)}
              title="Ширина контента"
            />

            <div className={styles.bottomContainer}>
              <Button title="Сбросить" htmlType="reset" type="clear" />
              <Button title="Применить" htmlType="submit" type="apply" />
            </div>
          </form>
        )}
      </aside>
    </div>
  );
};
