import { Accessor, Component, createSignal } from 'solid-js'
import { DynamicList } from '../components/collectionview'
import { TabBar } from '~/components/TabBar'

const Item: Component<{
  item: Accessor<string>
  index: Accessor<number>
  type: Accessor<string>
}> = (props) => {
  return props.type() === 'even' ? (
    <contentview>
      <flexboxlayout style={{ height: 100, padding: 10, backgroundColor: '#f0f0f0' }}>
        <label text={props.index() + ' ' + props.type() + ' ' + props.item()} />
      </flexboxlayout>
    </contentview>
  ) : (
    <contentview>
      <flexboxlayout style={{ height: 50, padding: 10, backgroundColor: '#a9a9a9' }}>
        <label text={props.index() + ' ' + props.type() + ' ' + props.item()} />
      </flexboxlayout>
    </contentview>
  )
}

const alphabet = 'abcdefghijklmnopqrstuvwxyz'

export const Home = () => {
  const [items, setItems] = createSignal(['a'])

  return (
    <>
      <flexboxlayout flexDirection="column">
        <button
          text="Add item"
          on:tap={() => {
            setItems((prev) => {
              return [...prev, alphabet[prev.length - 1]]
            })
          }}
          style={{
            height: 50,
            minHeight: 50,
          }}
        />

        <button
          text="Adjust item 0"
          on:tap={() => {
            setItems((prev) => {
              prev[0] = alphabet[Math.floor(Math.random() * (alphabet.length - 1))]
              return [...prev]
            })
          }}
          style={{
            height: 50,
            minHeight: 50,
          }}
        />
        <contentview
          style={{
            flexShrink: 1,
          }}
        >
          <DynamicList
            itemTypes={['even', 'odd']}
            items={items()}
            renderItem={({ item, index, type }) => <Item item={item} index={index} type={type} />}
            onItemType={(_, index) => {
              return index % 2 === 0 ? 'even' : 'odd'
            }}
          />
        </contentview>
      </flexboxlayout>
    </>
  )
}
