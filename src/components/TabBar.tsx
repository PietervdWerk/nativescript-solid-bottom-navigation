import { Color } from '@nativescript/core'

export const TabBar = () => {
  console.log('TabBar')

  return (
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
  )
}
