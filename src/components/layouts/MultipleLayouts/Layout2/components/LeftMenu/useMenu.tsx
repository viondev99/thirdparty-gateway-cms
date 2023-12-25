import { MenuPathProps, listMenuRoutes } from '@/routes'
import { Box, ButtonBase, Typography } from '@mui/material'
import React, { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MenuGroup from './MenuGroup'
import { PRIMARY } from '@/components/layouts/WrapLayout/Theme/colors'
import { useRouter } from 'next/router'

export const getParentMenu = (currentMenu: MenuPathProps, allMenu: any) => {
  if (allMenu?.children?.some((v: any) => v?.id === currentMenu?.id)) {
    return allMenu
  } else {
    let parentMenu = null
    if (allMenu?.children && allMenu?.children?.length > 0) {
      for (let i = 0; i < allMenu.children.length; i++) {
        const menuCheck = allMenu.children[i]
        const menuIdx: any = getParentMenu(currentMenu, menuCheck)
        if (menuIdx) {
          parentMenu = menuIdx
          break
        }
      }
      return parentMenu
    } else return null
  }
}

const useMenu = () => {
  const [subMenu, setSubMenu] = useState<any | null>(null)

  const handleBackToMenu = () => {
    const parentMenu = getParentMenu(subMenu, {
      id: -1,
      children: listMenuRoutes ?? [],
    })
    if (parentMenu?.id === -1) {
      setSubMenu(null)
    } else setSubMenu(parentMenu)
  }

  const router = useRouter()

  const renderMenuRoutes = () => {
    const totalCurrentMenu = subMenu?.children || listMenuRoutes

    return (
      <Box display='flex' flexDirection={'column'} style={{ width: '100%' }}>
        {subMenu && (
          <ButtonBase
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              padding: 12,
            }}
            onClick={() => handleBackToMenu()}
          >
            <ArrowBackIcon
              style={{ color: PRIMARY, marginRight: 8, width: 20, height: 20 }}
            />
            <Typography color='primary'>{subMenu?.name}</Typography>
          </ButtonBase>
        )}
        {totalCurrentMenu?.map((item: any, index: number) => {
          const isChecked = router?.pathname.startsWith(item.path)
          // const isHavePermision =
          //   listPermission?.length > 0
          //     ? listPermission.some((v) => v.id === item.apiId)
          //     : true
          if (true) {
            return (
              <MenuGroup
                key={index}
                item={item}
                isChecked={isChecked}
                listPermission={[]}
                isSystemAdmin={false}
                indexNumber={0}
                setSubMenu={setSubMenu}
                handleBackToMenu={handleBackToMenu}
              />
            )
          }
          return null
        })}
      </Box>
    )
  }

  return { renderMenuRoutes }
}

export default useMenu
