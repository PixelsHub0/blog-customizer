
import React, {
	useState,
	useRef,
	useEffect,
	useCallback,
	FormEvent
  } from 'react';
  import  clsx  from 'clsx';
  import { ArrowButton } from '../../ui/arrow-button';
  import { Button } from '../../ui/button';
  import { Select } from '../../ui/select';
  import { RadioGroup } from '../../ui/radio-group';
  import { Separator } from '../../ui/separator';
  import { useOutsideClickClose } from '../../ui/select/hooks/useOutsideClickClose';
  import { Text } from 'src/ui/text';
  import {
	defaultArticleState,
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr
  } from '../../constants/articleProps';
  import styles from './ArticleParamsForm.module.scss';

  /**
   * Пропсы компонента настроек статьи
   * @param initialSettings - начальные значения настроек (по умолчанию defaultArticleState)
   * @param onApply - колбек при применении настроек формы
   */
  export type ArticleParamsFormProps = {
	initialSettings?: ArticleStateType;
	onApply?: (settings: ArticleStateType) => void;
  };

  /**
   * Компонент боковой панели для настройки параметров статьи
   */
  export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	initialSettings = defaultArticleState,
	onApply = () => {}
  }) => {
	// Состояние открытия панели и текущие значения формы
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(
	  initialSettings
	);

	//Реф для корневого элемента панели (для обработки кликов вне)
	const sidebarRef = useRef<HTMLDivElement>(null);

	// При каждом открытии сбрасываем форму на initialSettings
	useEffect(() => {
	  if (isOpen) {
		setFormState(initialSettings);
	  }
	}, [isOpen, initialSettings]);

	// Закрываем панель при клике вне элемента
	useOutsideClickClose({
	  isOpen,
	  rootRef: sidebarRef,
	  onChange: setIsOpen
	});

	//Переключаем состояние панели
	const toggleSidebar = useCallback(() => {
	  setIsOpen(prev => !prev);
	}, []);

	/**
	 * Обновляем одно поле формы
	 * @param key - ключ поля из ArticleStateType
	 * @param value - новое значение поля
	 */
	const updateField = useCallback(
	  <K extends keyof ArticleStateType>(key: K, value: ArticleStateType[K]) => {
		setFormState(prev => ({ ...prev, [key]: value }));
	  },
	  []
	);

	/**
	 * Обработка отправки формы: отменяем дефолт и вызываем onApply
	 */
	const handleSubmit = useCallback(
	  (e: FormEvent) => {
		e.preventDefault();
		onApply(formState);
	  },
	  [formState, onApply]
	);

	/**
	 * Обработка сброса формы: отменяем дефолт, сбрасываем и вызываем onApply
	 */
	  // внутри ArticleParamsForm.tsx

	const handleReset = useCallback(
	  (e: FormEvent) => {
	  	  e.preventDefault();
	   	 // 1) сброс формы к дефолтным настройкам при загрузке страницы
	  	  setFormState(defaultArticleState);
	  	  // 2) применить эти дефолтные настройки к статье
	  	  onApply(defaultArticleState);
		},
	   [onApply]
  	);


	return (
	  <>
		{/* Кнопка-стрелка для открытия/закрытия панели */}
		<div className={styles.toggleButtonWrapper}>
		  <ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
		</div>

		{/* Боковая панель */}
		<aside
		  ref={sidebarRef}
		  className={clsx(styles.container, {
			[styles.container_open]: isOpen
		  })}
		  aria-hidden={!isOpen}
		>
		  {isOpen && (
			<form
			  className={styles.form}
			  onSubmit={handleSubmit}
			  onReset={handleReset}
			  noValidate
			>
			 {/* Заголовок панели */}
			 <Text children='Задайте параметры' as='h2' size={31} weight={800} uppercase={true}/>

			  {/* Выбор шрифта */}
			  <Select
				title="Шрифт"
				options={fontFamilyOptions}
				selected={formState.fontFamilyOption}
				onChange={opt => updateField('fontFamilyOption', opt)}
			  />

			  {/* Выбор размера шрифта */}
			  <RadioGroup
				title="Размер шрифта"
				name="fontSize"
				options={fontSizeOptions}
				selected={formState.fontSizeOption}
				onChange={opt => updateField('fontSizeOption', opt)}
			  />

			  {/* Выбор цвета шрифта */}
			  <Select
				title="Цвет шрифта"
				options={fontColors}
				selected={formState.fontColor}
				onChange={opt => updateField('fontColor', opt)}
			  />

			  {/* Разделитель */}
			  <Separator />

			  {/* Выбор цвета фона */}
			  <Select
				title="Цвет фона"
				options={backgroundColors}
				selected={formState.backgroundColor}
				onChange={opt => updateField('backgroundColor', opt)}
			  />

			  {/* Выбор ширины контента */}
			  <Select
				title="Ширина контента"
				options={contentWidthArr}
				selected={formState.contentWidth}
				onChange={opt => updateField('contentWidth', opt)}
			  />

			  {/* Кнопки действий */}
			  <div className={styles.bottomContainer}>
				<Button title="Сбросить" type="clear" htmlType="reset" />
				<Button title="Применить" type="apply" htmlType="submit" />
			  </div>
			</form>
		  )}
		</aside>
	  </>
	);
  };