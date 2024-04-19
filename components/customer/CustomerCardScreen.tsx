import React, { useEffect, useState } from 'react'
import { BottomNavigation, Text } from 'react-native-paper'
import { CustomerCard } from './CustomerCard'
import { SupplyPointList } from './supply_point/SupplyPointList'
import Comments from './ComponentComments'
import ComponentDocuments from './ComponentDocuments'

export default function CustomerCardScreen({ route }) {
  const { customerId } = route.params

  const [index, setIndex] = useState(0)
  const routes = [
    {
      key: 'card',
      title: 'Ficha',
      focusedIcon: 'credit-card',
      unfocusedIcon: 'credit-card-outline',
    },
    {
      key: 'comments',
      title: 'Comentarios',
      focusedIcon: 'comment',
      unfocusedIcon: 'comment-outline',
    },
    {
      key: 'ps',
      title: 'P.S',
      focusedIcon: 'comment',
      unfocusedIcon: 'comment-outline',
    },
    {
      key: 'doc',
      title: 'DOC',
      focusedIcon: 'file',
      unfocusedIcon: 'file-outline',
    },
  ]
  const renderScene = BottomNavigation.SceneMap({
    card: () => <CustomerCard customerId={customerId} />,
    comments: () => <Comments customerId={customerId} />,
    ps: () => <SupplyPointList customerId={customerId} />,
    doc: () => <ComponentDocuments customerId={customerId} />,
  })

  if (!customerId) {
    return <Text>Cargando...</Text>
  }
  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  )
}
