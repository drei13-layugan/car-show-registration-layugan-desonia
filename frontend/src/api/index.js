import * as sample from './sample-data.js'
import * as real from './registrationsApi.js'

const source = import.meta.env.VITE_USE_SAMPLE === 'true' ? sample : real

export const getRegistrations = source.getRegistrations
export const getSummary = source.getSummary