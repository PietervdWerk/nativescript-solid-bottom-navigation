import { CollectionView } from '@nativescript-community/ui-collectionview'
import {
  BottomNavigation,
  TabStrip,
  TabStripItem,
  TabContentItem,
} from '@nativescript-community/ui-material-bottom-navigation'
import { BottomNavigationBar } from '@nativescript-community/ui-material-bottomnavigationbar'
import { Route, StackRouter } from './router'
import { Home } from './routes/home'
import { makeListView, makeView, registerElement } from 'dominative'
import { ItemLoadingEventData } from '@nativescript-dom/core-types'
import { TabBar } from './components/TabBar'

registerElement('collectionview', makeListView(CollectionView, { force: true }))

registerElement('bottomnavigation', BottomNavigation)
registerElement('tabstrip', TabStrip)
registerElement('tabstripitem', TabStripItem)
registerElement('tabcontentitem', TabContentItem)
registerElement('bottomnavigationbar', BottomNavigationBar)

declare global {
  interface HTMLCollectionViewElement extends HTMLListViewElement {}

  var HTMLCollectionViewElement: {
    prototype: HTMLCollectionViewElement
    new (): HTMLCollectionViewElement
  }

  interface HTMLCollectionViewElement extends HTMLListViewElement {}

  var HTMLCollectionViewElement: {
    prototype: HTMLCollectionViewElement
    new (): HTMLCollectionViewElement
  }
}

declare module '@nativescript-dom/solidjs-types/jsx-runtime' {
  export namespace JSX {
    interface IntrinsicElements {
      /**
       * Register custom library view
       */
      collectionview: Partial<HTMLListViewElementAttributes<HTMLCollectionViewElement>>

      /**
       * Register dominative elements
       */
      itemtemplate: Partial<
        HTMLViewBaseElementAttributes & {
          'on:createView': (event: ItemLoadingEventData) => void
          'on:itemLoading': (event: ItemLoadingEventData) => void
          key: string
        }
      >
      arrayprop: Partial<
        HTMLViewBaseElementAttributes & {
          key: string
        }
      >
      keyprop: Partial<
        HTMLViewBaseElementAttributes & {
          key: string
        }
      >
    }
  }
}

export const App = () => {
  return (
    <>
      <bottomnavigation
        width="100%"
        id="main-tabview"
        className="main-tabview"
        selectedIndexChanged="onSelectedIndexChanged"
        iosOverflowSafeArea="true"
        selectedIndex="0"
        tabsPosition="bottom"
        swipeEnabled="false"
      >
        <tabstrip>
          <tabstripitem className="tab-item">
            <image src="font://&#xe1b0;" className="fal"></image>
            <label ios:fontSize="10" android:fontSize="12">
              Home
            </label>
          </tabstripitem>
          <tabstripitem className="tab-item">
            <label ios:fontSize="10" android:fontSize="12">
              search
            </label>
            <image src="font://&#xe024;" className="fal"></image>
          </tabstripitem>
          <tabstripitem className="tab-item">
            <label ios:fontSize="10" android:fontSize="12">
              trips
            </label>
            <image src="font://&#xf03a;" className="fal"></image>
          </tabstripitem>
          <tabstripitem className="tab-item">
            <label ios:fontSize="10" android:fontSize="12">
              inbox
            </label>
            <image src="font://&#xf4b6;" className="fal"></image>
          </tabstripitem>
        </tabstrip>

        <tabcontentitem>
          <gridlayout>
            <label text="Home" className="h2 text-center"></label>
          </gridlayout>
        </tabcontentitem>
        <tabcontentitem>
          <gridlayout>
            <label text="Search Page" className="h2 text-center"></label>
          </gridlayout>
        </tabcontentitem>
        <tabcontentitem>
          <gridlayout>
            <label text="TRansactions" className="h2 text-center"></label>
          </gridlayout>
        </tabcontentitem>
        <tabcontentitem>
          <gridlayout>
            <label text="Inbox" className="h2 text-center"></label>
          </gridlayout>
        </tabcontentitem>
      </bottomnavigation>
      <label>App</label>
      {/* <StackRouter initialRouteName="Home">
        <Route name="Home" component={Home as any} />
      </StackRouter> */}
    </>
  )
}
