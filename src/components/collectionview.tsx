import { JSX } from '@nativescript-dom/solidjs-types/jsx-runtime'
import { ContentView, View } from '@nativescript/core'
import {
  Accessor,
  children,
  Component,
  createSignal,
  For,
  getOwner,
  Owner,
  runWithOwner,
} from 'solid-js'

const [myItems, setMyItems] = createSignal(['a'])
setMyItems()

type OnLoadingEventData<T extends {}> = {
  item: {
    index: T
  }
  index: number
  view: ContentView & {
    __update_solid_context?: (item: any, index: number, type: string) => void
  }
}

type DynamicListProps<T extends {}> = {
  renderItem: (props: {
    item: Accessor<T>
    index: Accessor<number>
    type: Accessor<string>
  }) => JSX.Element
  items: T[]
  onItemType: (item: T, index: number) => string
  itemTypes: string[]
} & Omit<
  JSX.IntrinsicElements['collectionview'],
  'itemTemplateSelector' | 'items' | 'itemTemplates' | 'itemTemplate'
>

export const DynamicList = <T extends {}>(props: DynamicListProps<T>) => {
  const owner = getOwner()
  const { items, renderItem, onItemType, itemTypes, ...restProps } = props
  const templates = props.itemTypes || ['_default']

  return (
    <contentview
      style={{
        width: '100%',
        height: '100%',
        flexGrow: 1,
      }}
    >
      <collectionview
        {...restProps}
        items={{
          length: props.items?.length,
          getItem(index: number) {
            return {
              index: props.items?.[index],
            }
          },
        }}
        itemTemplateSelector={(item: T, index: number) => {
          return onItemType?.(item, index) || '_default'
        }}
      >
        <arrayprop key="itemTemplates">
          <For each={templates}>
            {(key) => (
              <itemtemplate
                key={key}
                // itemLoading is called for each new item in the collection
                on:itemLoading={(event: OnLoadingEventData<T>) => {
                  if (event.view.__update_solid_context !== undefined) {
                    event.view.__update_solid_context(event.item.index, event.index, key)
                  } else {
                    runWithOwner(owner as Owner, () => {
                      const [item, setItem] = createSignal(event.item.index)
                      const [index, setIndex] = createSignal<number>(event.index || 0)
                      const [type, setType] = createSignal<string>(key)
                      const element = children(() => renderItem({ item, index, type: type }))

                      event.view.content = element() as never
                      event.view.__update_solid_context = (
                        item: T,
                        index: number,
                        type: string
                      ) => {
                        setItem(() => item)
                        setIndex(index)
                        setType(type)
                      }
                    })
                  }
                }}
                on:createView={(event) => {
                  event.view = document.createElement('ContentView') as any
                }}
              />
            )}
          </For>
        </arrayprop>
      </collectionview>
    </contentview>
  )
}
