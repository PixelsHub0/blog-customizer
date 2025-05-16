# Blog Customizer

Приложение позволяет интерактивно настраивать стили статьи (шрифт, размер, цвета, ширину контента) через сайдбар с контролами из UI-kit. Все настройки применяются через CSS-переменные.

---

## 📂 Файловая система

```text
src/
├── components/
│   ├── article/
│   │   ├── Article.tsx
│   │   └── Article.module.scss
│   └── article-params-form/
│       ├── ArticleParamsForm.tsx
│       └── ArticleParamsForm.module.scss
├── constants/
│   └── articleProps.ts
├── ui/
│   ├── arrow-button/
│   │   ├── ArrowButton.tsx
│   │   └── ArrowButton.module.scss
│   ├── button/
│   │   ├── Button.tsx
│   │   └── Button.module.scss
│   ├── select/
│   │   ├── Select.tsx
│   │   ├── Select.module.scss
│   │   └── hooks/useOutsideClickClose.ts
│   ├── radio-group/
│   │   ├── RadioGroup.tsx
│   │   ├── RadioGroup.module.scss
│   │   └── Option.tsx
│   ├── separator/
│   │   ├── Separator.tsx
│   │   └── Separator.module.scss
│   └── text/
│       ├── Text.tsx
│       └── Text.module.scss
├── styles/
│   ├── index.scss            # глобальные переменные CSS
│   └── index.module.scss     # стили .main
└── index.tsx                  # точка входа (рендер <App />)
```
## **Установка и запуск**
**Установить зависимости:**
```bash
npm install
```
**Запустить дев-сервер:**
```bash
npm start
```
**Запустить Storybook (UI-kit-превью):**
```bash
npm run storybook
```
**Линтеры и форматирование:**
```bash
npm run lint
npm run stylelint
npm run format
```
## **Основные компоненты**
 - ```<App /> (src/index.tsx)```:
    - **Хранит глобальное состояние articleSettings (тип ArticleStateType).**

    - **При обновлении state через useEffect выставляет CSS-переменные на <html>.**

     - **Рендерит <ArticleParamsForm /> и <Article />.**

 - ```<ArticleParamsForm /> (components/article-params-form)```:

     - **Кнопка-стрелка <ArrowButton> открывает/закрывает сайдбар.**

    - **Локальный state formState инициализируется из initialSettings.**

 - **Контролы**:

    - **<Select> — выбор шрифта, цвета шрифта, цвета фона, ширины.**

     - **<RadioGroup> — выбор размера шрифта.**

    - **<Separator> — визуальные разделители блоков.**

    - **Кнопки <Button>: «Сбросить» (type="reset") и «Применить» (type="submit").**

    - **onSubmit вызывает onApply(formState) → обновляет глобальный state.**

    - **onReset сбрасывает в defaultArticleState и сразу применяет его.**

 - ```<Article /> (components/article)```:

    - ##### **Читает CSS-переменные:**

        - **--container-width → ширина контейнера.**

         - **--font-family, --font-size, --font-color → типографика.**

        - **--bg-color → фон.**

        - **Рендерит заголовок, описание, изображение и текст статьи.**
## **Функциональность**
##### **1.Открытие/закрытие панели**:
 – **Клик по стрелке или вне панели переключает её состояние.**

##### **2.Локальное редактирование**
 – **Изменения в контролах не отражаются сразу на статье.**

##### **3.Применение настроек**
**– По нажатию Применить сбрасывается preventDefault, вызывается onApply и CSS-переменные на <html> обновляются → статья перерисовывается.**

##### **4.Сброс к дефолту**
 **– По нажатию Сбросить форма и глобальный state возвращаются в defaultArticleState (дефолт при загрузке страницы), и стили статьи восстанавливаются.**

##### **5.CSS-переменные**
 **– Все визуальные настройки прокидываются через переменные --font-family, --font-size, --font-color, --bg-color, --container-width.**

