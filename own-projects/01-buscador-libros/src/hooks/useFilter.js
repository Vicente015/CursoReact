import { useState } from 'react'

/*
  filters =
  { lang: {values: [], filter: () => {} } }
 */

export default function useFilter ({ bookshelfFilterState, langFilterState, tagsFilterState }) {
  const [enabledFilters, setEnabledFilters] = useState()
}
