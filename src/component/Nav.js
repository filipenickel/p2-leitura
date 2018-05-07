import React from 'react'
import { Menu,Container } from 'semantic-ui-react'

const items = [
  { key: 'categoria', active: true, name: 'Categorias' },
  { key: 'react', name: 'React' },
  { key: 'redux', name: 'Redux' },
]

const Nav = () => (
  <Container>
  <Menu items={items} />
  </Container>
)

export default Nav