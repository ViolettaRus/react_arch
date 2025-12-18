import { MantineProvider as MantineProviderBase } from '@mantine/core'
import '@mantine/core/styles.css'

export const MantineProvider = ({ children }) => {
  return (
    <MantineProviderBase>
      {children}
    </MantineProviderBase>
  )
}

