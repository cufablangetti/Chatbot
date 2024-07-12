import { platform, release, arch, cpus, freemem } from 'node:os'
console.log('informacion del sistema operativo')
console.log('nombre del sistema operativo',platform())
console.log('version del sistema operativo', release())
console.log('arquitectura',arch())
console.log('CPUS', cpus())
console.log ('memorialibre', freemem())
