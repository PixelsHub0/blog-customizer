// src/components/article-params-form/ArticleParamsForm.tsx
import React, {
	useState,
	useRef,
	useEffect,
	useCallback,
	FormEvent,
  } from 'react'
  import clsx from 'clsx'
  import { ArrowButton } from '../../ui/arrow-button'
  import { Button } from '../../ui/button'
  import { Select } from '../../ui/select'
  import { RadioGroup } from '../../ui/radio-group'
  import { Separator } from '../../ui/separator'
  import { Text } from '../../ui/text'
  import {
	defaultArticleState,
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
  } from '../../constants/articleProps'
  import styles from './ArticleParamsForm.module.scss'

  export type ArticleParamsFormProps = {
	initialSettings?: ArticleStateType
	onApply?: (settings: ArticleStateType) => void
  }

  /**
   * Компонент боковой панели для настройки параметров статьи
   */
  export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	initialSettings = defaultArticleState,
	onApply = () => {},
  }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [formState, setFormState] = useState<ArticleStateType>(initialSettings)
	const sidebarRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
	  if (isMenuOpen) {
		setFormState(initialSettings)
	  }
	}, [isMenuOpen, initialSettings])

	useEffect(() => {
	  if (!isMenuOpen) return
	  const handleClickOutside = (e: MouseEvent) => {
		if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
		  setIsMenuOpen(false)
		}
	  }
	  window.addEventListener('mousedown', handleClickOutside)
	  return () => {
		window.removeEventListener('mousedown', handleClickOutside)
	  }
	}, [isMenuOpen])

	const toggleMenu = useCallback(() => {
	  setIsMenuOpen(open => !open)
	}, [])

	const updateField = useCallback(
	  <K extends keyof ArticleStateType>(key: K, value: ArticleStateType[K]) => {
		setFormState(prev => ({ ...prev, [key]: value }))
	  },
	  []
	)

	// Исправлено: теперь формальный тип события — для HTMLFormElement
	const handleSubmit = useCallback(
	  (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		onApply(formState)
	  },
	  [formState, onApply]
	)

	// Исправлено: аналогично для сброса формы
	const handleReset = useCallback(
	  (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setFormState(defaultArticleState)
		onApply(defaultArticleState)
	  },
	  [onApply]
	)

	return (
	  <>
		<div className={styles.toggleButtonWrapper}>
		  <ArrowButton isOpen={isMenuOpen} onClick={toggleMenu} />
		</div>

		<aside
		  ref={sidebarRef}
		  className={clsx(styles.container, {
			[styles.container_open]: isMenuOpen,
		  })}
		  aria-hidden={!isMenuOpen}
		>
		  {isMenuOpen && (
			<form
			  className={styles.form}
			  onSubmit={handleSubmit}
			  onReset={handleReset}
			  noValidate
					>
			  <Text children='Задайте параметры' as='h2' size={31} weight={800} uppercase={true}/>

			  {/* Типографика */}
			  <Select
				title="Шрифт"
				options={fontFamilyOptions}
				selected={formState.fontFamilyOption}
				onChange={opt => updateField('fontFamilyOption', opt)}
			  />
			  <RadioGroup
				title="Размер шрифта"
				name="fontSize"
				options={fontSizeOptions}
				selected={formState.fontSizeOption}
				onChange={opt => updateField('fontSizeOption', opt)}
			  />

			  <Separator />

			  {/* Цвета */}
			  <Select
				title="Цвет шрифта"
				options={fontColors}
				selected={formState.fontColor}
				onChange={opt => updateField('fontColor', opt)}
			  />
			  <Select
				title="Цвет фона"
				options={backgroundColors}
				selected={formState.backgroundColor}
				onChange={opt => updateField('backgroundColor', opt)}
			  />

			  <Separator />

			  {/* Геометрия */}
			  <Select
				title="Ширина контента"
				options={contentWidthArr}
				selected={formState.contentWidth}
				onChange={opt => updateField('contentWidth', opt)}
			  />

			  <div className={styles.bottomContainer}>
				<Button title="Сбросить" type="clear" htmlType="reset" />
				<Button title="Применить" type="apply" htmlType="submit" />
			  </div>
			</form>
		  )}
		</aside>
	  </>
	)
  }
