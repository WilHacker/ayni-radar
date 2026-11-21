import 'dotenv/config';
import { scryptSync, randomBytes } from 'node:crypto';
import { PrismaPg } from '@prisma/adapter-pg';
import {
  EstadoAlerta,
  EstadoDistribucion,
  EstadoDonacion,
  EstadoZona,
  PrismaClient,
  RolUsuario,
  TipoDesastre,
  TipoDonacion,
  TipoOrganizacion,
} from '@prisma/client';

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const derived = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${derived}`;
}

async function main(): Promise<void> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL no está definida en .env');
  }

  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });

  try {
    const demoPasswordHash = hashPassword('AyniDemo2026!');

    const organizaciones = [
      {
        id: 'org-brigada-chiquitania',
        nombre: 'Brigada Forestal Chiquitanía',
        tipo: TipoOrganizacion.BRIGADA,
        departamento: 'Santa Cruz',
        telefono: '+591 71001122',
        qrImagenUrl: 'https://placehold.co/300x300/png?text=QR+Brigada+Chiquitania',
        verificada: true,
      },
      {
        id: 'org-cruz-roja-beni',
        nombre: 'Cruz Roja Filial Beni',
        tipo: TipoOrganizacion.ONG,
        departamento: 'Beni',
        telefono: '+591 72003344',
        qrImagenUrl: 'https://placehold.co/300x300/png?text=QR+Cruz+Roja+Beni',
        verificada: true,
      },
      {
        id: 'org-voluntarios-altiplano',
        nombre: 'Asociación Voluntarios Altiplano',
        tipo: TipoOrganizacion.ASOCIACION,
        departamento: 'Oruro',
        telefono: '+591 73005566',
        qrImagenUrl: 'https://placehold.co/300x300/png?text=QR+Voluntarios+Altiplano',
        verificada: true,
      },
      {
        id: 'org-solidaria-andes',
        nombre: 'Empresa Solidaria Los Andes',
        tipo: TipoOrganizacion.EMPRESA,
        departamento: 'La Paz',
        telefono: '+591 74007788',
        qrImagenUrl: 'https://placehold.co/300x300/png?text=QR+Los+Andes',
        verificada: true,
      },
    ];

    for (const org of organizaciones) {
      await prisma.organizacion.upsert({
        where: { id: org.id },
        update: org,
        create: org,
      });
    }

    const usuarios = [
      {
        id: 'usr-admin',
        username: 'admin_ayni',
        email: 'admin@ayniradar.bo',
        nombreCompleto: 'Administrador AyniRadar',
        rol: RolUsuario.ADMIN,
        organizacionId: null,
      },
      {
        id: 'usr-publicador',
        username: 'editor_bolivia',
        email: 'editor@ayniradar.bo',
        nombreCompleto: 'Redacción Emergencias Bolivia',
        rol: RolUsuario.PUBLICADOR,
        organizacionId: null,
      },
      {
        id: 'usr-voluntario',
        username: 'voluntario_chiquitania',
        email: 'brigada@ayniradar.bo',
        nombreCompleto: 'Carlos Mamani',
        rol: RolUsuario.VOLUNTARIO,
        organizacionId: 'org-brigada-chiquitania',
      },
      {
        id: 'usr-general',
        username: 'ciudadano_demo',
        email: 'ciudadano@ayniradar.bo',
        nombreCompleto: 'Lucía Quispe',
        rol: RolUsuario.GENERAL,
        organizacionId: null,
      },
      {
        id: 'usr-don-1',
        username: 'ayni_carlos',
        email: 'carlos@ejemplo.bo',
        nombreCompleto: 'Carlos Vega',
        rol: RolUsuario.GENERAL,
        organizacionId: null,
      },
      {
        id: 'usr-don-2',
        username: 'lidia_scz',
        email: 'lidia@ejemplo.bo',
        nombreCompleto: 'Lidia Roca',
        rol: RolUsuario.GENERAL,
        organizacionId: null,
      },
      {
        id: 'usr-don-3',
        username: 'marco_lpz',
        email: 'marco@ejemplo.bo',
        nombreCompleto: 'Marco Flores',
        rol: RolUsuario.GENERAL,
        organizacionId: null,
      },
      {
        id: 'usr-don-4',
        username: 'sofia_cbba',
        email: 'sofia@ejemplo.bo',
        nombreCompleto: 'Sofía Méndez',
        rol: RolUsuario.GENERAL,
        organizacionId: null,
      },
      {
        id: 'usr-don-5',
        username: 'diego_oruro',
        email: 'diego@ejemplo.bo',
        nombreCompleto: 'Diego Condori',
        rol: RolUsuario.GENERAL,
        organizacionId: null,
      },
      {
        id: 'usr-don-6',
        username: 'elena_beni',
        email: 'elena@ejemplo.bo',
        nombreCompleto: 'Elena Suárez',
        rol: RolUsuario.GENERAL,
        organizacionId: null,
      },
    ];

    for (const u of usuarios) {
      await prisma.usuario.upsert({
        where: { username: u.username },
        update: {
          email: u.email,
          nombreCompleto: u.nombreCompleto,
          rol: u.rol,
          organizacionId: u.organizacionId,
          activo: true,
        },
        create: {
          ...u,
          passwordHash: demoPasswordHash,
          activo: true,
        },
      });
    }

    const zonas = [
      {
        id: 'zona-robore-incendio',
        titulo: 'Incendio Forestal Roboré — Chiquitanía',
        departamento: 'Santa Cruz',
        tipo: TipoDesastre.INCENDIO,
        latitud: -18.3347,
        longitud: -59.7614,
        estado: EstadoZona.ACTIVA,
        severidad: 5,
        metaBs: 15000,
        recaudadoBs: 6400,
        qrImagenUrl: 'https://placehold.co/300x300/png?text=QR+Robore',
        necesidadesJson: {
          agua: { requerido: 500, cubierto: 280, unidad: 'litros' },
          medicina: { requerido: 100, cubierto: 45, unidad: 'kits' },
          alimentos: { requerido: 200, cubierto: 110, unidad: 'raciones' },
          ropa: { requerido: 80, cubierto: 75, unidad: 'prendas' },
        },
      },
      {
        id: 'zona-san-matias-incendio',
        titulo: 'Focos de Calor San Matías',
        departamento: 'Santa Cruz',
        tipo: TipoDesastre.INCENDIO,
        latitud: -16.3608,
        longitud: -58.4044,
        estado: EstadoZona.ACTIVA,
        severidad: 4,
        metaBs: 10000,
        recaudadoBs: 3200,
        qrImagenUrl: 'https://placehold.co/300x300/png?text=QR+San+Matias',
        necesidadesJson: {
          agua: { requerido: 300, cubierto: 120, unidad: 'litros' },
          medicina: { requerido: 60, cubierto: 20, unidad: 'kits' },
        },
      },
      {
        id: 'zona-trinidad-inundacion',
        titulo: 'Desborde Río Mamoré — Trinidad',
        departamento: 'Beni',
        tipo: TipoDesastre.INUNDACION,
        latitud: -14.8333,
        longitud: -64.9,
        estado: EstadoZona.ACTIVA,
        severidad: 5,
        metaBs: 18000,
        recaudadoBs: 8100,
        qrImagenUrl: 'https://placehold.co/300x300/png?text=QR+Trinidad',
        necesidadesJson: {
          agua: { requerido: 800, cubierto: 420, unidad: 'litros' },
          alimentos: { requerido: 350, cubierto: 190, unidad: 'raciones' },
          medicina: { requerido: 120, cubierto: 60, unidad: 'kits' },
        },
      },
      {
        id: 'zona-tipuani-inundacion',
        titulo: 'Inundación Valle de Tipuani',
        departamento: 'La Paz',
        tipo: TipoDesastre.INUNDACION,
        latitud: -15.55,
        longitud: -68.0,
        estado: EstadoZona.ACTIVA,
        severidad: 4,
        metaBs: 12000,
        recaudadoBs: 4500,
        qrImagenUrl: 'https://placehold.co/300x300/png?text=QR+Tipuani',
        necesidadesJson: {
          agua: { requerido: 400, cubierto: 180, unidad: 'litros' },
          ropa: { requerido: 150, cubierto: 90, unidad: 'prendas' },
        },
      },
      {
        id: 'zona-caranavi-deslizamiento',
        titulo: 'Deslizamiento Ruta Caranavi — Yungas',
        departamento: 'La Paz',
        tipo: TipoDesastre.DESLIZAMIENTO,
        latitud: -15.8333,
        longitud: -67.5667,
        estado: EstadoZona.ACTIVA,
        severidad: 4,
        metaBs: 9000,
        recaudadoBs: 2700,
        qrImagenUrl: 'https://placehold.co/300x300/png?text=QR+Caranavi',
        necesidadesJson: {
          alimentos: { requerido: 150, cubierto: 70, unidad: 'raciones' },
          medicina: { requerido: 50, cubierto: 25, unidad: 'kits' },
        },
      },
      {
        id: 'zona-challapata-helada',
        titulo: 'Helada Severa Altiplano — Challapata',
        departamento: 'Oruro',
        tipo: TipoDesastre.HELADA,
        latitud: -18.9,
        longitud: -66.7667,
        estado: EstadoZona.ACTIVA,
        severidad: 4,
        metaBs: 8000,
        recaudadoBs: 2900,
        qrImagenUrl: 'https://placehold.co/300x300/png?text=QR+Challapata',
        necesidadesJson: {
          ropa: { requerido: 250, cubierto: 140, unidad: 'prendas' },
          medicina: { requerido: 80, cubierto: 35, unidad: 'kits' },
        },
      },
      {
        id: 'zona-uyuni-sequia',
        titulo: 'Sequía Prolongada — Sudoeste Potosí',
        departamento: 'Potosí',
        tipo: TipoDesastre.SEQUIA,
        latitud: -20.4631,
        longitud: -66.8239,
        estado: EstadoZona.ACTIVA,
        severidad: 3,
        metaBs: 11000,
        recaudadoBs: 3600,
        qrImagenUrl: 'https://placehold.co/300x300/png?text=QR+Uyuni',
        necesidadesJson: {
          agua: { requerido: 1000, cubierto: 350, unidad: 'litros' },
          alimentos: { requerido: 180, cubierto: 60, unidad: 'raciones' },
        },
      },
      {
        id: 'zona-tiquipaya-deslizamiento',
        titulo: 'Alerta Quebrada Taquiña — Tiquipaya',
        departamento: 'Cochabamba',
        tipo: TipoDesastre.DESLIZAMIENTO,
        latitud: -17.3389,
        longitud: -66.2167,
        estado: EstadoZona.POR_VERIFICAR,
        severidad: 2,
        metaBs: 5000,
        recaudadoBs: 500,
        qrImagenUrl: 'https://placehold.co/300x300/png?text=QR+Tiquipaya',
        necesidadesJson: {
          agua: { requerido: 150, cubierto: 30, unidad: 'litros' },
        },
      },
      {
        id: 'zona-villamontes-sequia',
        titulo: 'Déficit Hídrico — Villa Montes',
        departamento: 'Tarija',
        tipo: TipoDesastre.SEQUIA,
        latitud: -21.2625,
        longitud: -63.4694,
        estado: EstadoZona.POR_VERIFICAR,
        severidad: 2,
        metaBs: 6000,
        recaudadoBs: 0,
        qrImagenUrl: 'https://placehold.co/300x300/png?text=QR+Villa+Montes',
        necesidadesJson: {
          agua: { requerido: 400, cubierto: 0, unidad: 'litros' },
        },
      },
    ];

    for (const z of zonas) {
      await prisma.zona.upsert({
        where: { id: z.id },
        update: z,
        create: z,
      });
    }

    const reportes = [
      {
        id: 'rep-robore-1',
        zonaId: 'zona-robore-incendio',
        usuarioId: 'usr-voluntario',
        tipo: TipoDesastre.INCENDIO,
        descripcion: 'Foco activo cerca de comunidad San Lorenzo, humo denso en carretera.',
        latitud: -18.3347,
        longitud: -59.7614,
        reportanteTag: 'voluntario_chiquitania',
      },
      {
        id: 'rep-robore-2',
        zonaId: 'zona-robore-incendio',
        usuarioId: 'usr-general',
        tipo: TipoDesastre.INCENDIO,
        descripcion: 'Brigadas comunales piden agua y colirio por avance del fuego.',
        latitud: -18.338,
        longitud: -59.758,
        reportanteTag: 'ciudadano_demo',
      },
      {
        id: 'rep-robore-3',
        zonaId: 'zona-robore-incendio',
        usuarioId: 'usr-don-2',
        tipo: TipoDesastre.INCENDIO,
        descripcion: 'Se confirma fuego en pastizales a 800 m del primer reporte.',
        latitud: -18.331,
        longitud: -59.764,
        reportanteTag: 'lidia_scz',
      },
      {
        id: 'rep-trinidad-1',
        zonaId: 'zona-trinidad-inundacion',
        usuarioId: 'usr-don-6',
        tipo: TipoDesastre.INUNDACION,
        descripcion: 'Agua ingresando a viviendas en zona baja de Puerto Almacén.',
        latitud: -14.8333,
        longitud: -64.9,
        reportanteTag: 'elena_beni',
      },
      {
        id: 'rep-trinidad-2',
        zonaId: 'zona-trinidad-inundacion',
        usuarioId: 'usr-general',
        tipo: TipoDesastre.INUNDACION,
        descripcion: 'Familias evacuadas necesitan agua potable y mosquiteros.',
        latitud: -14.836,
        longitud: -64.902,
        reportanteTag: 'ciudadano_demo',
      },
      {
        id: 'rep-trinidad-3',
        zonaId: 'zona-trinidad-inundacion',
        usuarioId: 'usr-don-1',
        tipo: TipoDesastre.INUNDACION,
        descripcion: 'Nivel del río subió 40 cm en las últimas 6 horas.',
        latitud: -14.831,
        longitud: -64.897,
        reportanteTag: 'ayni_carlos',
      },
      {
        id: 'rep-tiquipaya-1',
        zonaId: 'zona-tiquipaya-deslizamiento',
        usuarioId: 'usr-don-4',
        tipo: TipoDesastre.DESLIZAMIENTO,
        descripcion: 'Material de arrastre en quebrada tras lluvia intensa.',
        latitud: -17.3389,
        longitud: -66.2167,
        reportanteTag: 'sofia_cbba',
      },
    ];

    for (const r of reportes) {
      await prisma.reporte.upsert({
        where: { id: r.id },
        update: r,
        create: r,
      });
    }

    const donaciones = [
      {
        id: 'don-robore-1',
        zonaId: 'zona-robore-incendio',
        usuarioId: 'usr-don-1',
        nombreDonante: 'ayni_carlos',
        tipo: TipoDonacion.DINERO,
        montoBs: 2500,
        comprobanteUrl: 'https://placehold.co/400x260/png?text=Comprobante+2500Bs',
        evidenciaEntregaUrl: 'https://placehold.co/400x260/png?text=Entrega+Robore',
        estado: EstadoDonacion.ENTREGADA,
      },
      {
        id: 'don-robore-2',
        zonaId: 'zona-robore-incendio',
        usuarioId: 'usr-don-2',
        nombreDonante: 'lidia_scz',
        tipo: TipoDonacion.DINERO,
        montoBs: 1800,
        comprobanteUrl: 'https://placehold.co/400x260/png?text=Comprobante+1800Bs',
        estado: EstadoDonacion.VERIFICADA,
      },
      {
        id: 'don-robore-3',
        zonaId: 'zona-robore-incendio',
        usuarioId: 'usr-don-4',
        nombreDonante: 'sofia_cbba',
        tipo: TipoDonacion.AGUA,
        cantidad: 120,
        detalleInsumo: 'Bidones de agua purificada 20L',
        estado: EstadoDonacion.ENTREGADA,
      },
      {
        id: 'don-trinidad-1',
        zonaId: 'zona-trinidad-inundacion',
        usuarioId: 'usr-don-3',
        nombreDonante: 'marco_lpz',
        tipo: TipoDonacion.DINERO,
        montoBs: 3200,
        comprobanteUrl: 'https://placehold.co/400x260/png?text=Comprobante+3200Bs',
        estado: EstadoDonacion.VERIFICADA,
      },
      {
        id: 'don-trinidad-2',
        zonaId: 'zona-trinidad-inundacion',
        usuarioId: 'usr-don-6',
        nombreDonante: 'elena_beni',
        tipo: TipoDonacion.DINERO,
        montoBs: 1500,
        comprobanteUrl: 'https://placehold.co/400x260/png?text=Comprobante+1500Bs',
        estado: EstadoDonacion.ENTREGADA,
      },
      {
        id: 'don-challapata-1',
        zonaId: 'zona-challapata-helada',
        usuarioId: 'usr-don-5',
        nombreDonante: 'diego_oruro',
        tipo: TipoDonacion.ROPA,
        cantidad: 80,
        detalleInsumo: 'Frazadas térmicas y chompas de abrigo',
        estado: EstadoDonacion.COMPROMETIDA,
      },
      {
        id: 'don-uyuni-1',
        zonaId: 'zona-uyuni-sequia',
        usuarioId: 'usr-don-1',
        nombreDonante: 'ayni_carlos',
        tipo: TipoDonacion.DINERO,
        montoBs: 1200,
        comprobanteUrl: 'https://placehold.co/400x260/png?text=Comprobante+1200Bs',
        estado: EstadoDonacion.VERIFICADA,
      },
    ];

    for (const d of donaciones) {
      await prisma.donacion.upsert({
        where: { id: d.id },
        update: d,
        create: d,
      });
    }

    const alertas = [
      {
        id: 'alerta-oruro-helada',
        zonaId: 'zona-challapata-helada',
        departamento: 'Oruro',
        tipo: TipoDesastre.HELADA,
        titulo: 'Alerta Temprana de Helada Extrema en Challapata',
        descripcion:
          'Temperatura mínima proyectada muy por debajo del promedio histórico de noviembre.',
        latitud: -18.9,
        longitud: -66.7667,
        valorHistorico: -1.2,
        valorActual: -8.5,
        unidadMedida: '°C',
        fuenteApi: 'Open-Meteo Archive vs Forecast',
        estado: EstadoAlerta.ACTIVA,
      },
      {
        id: 'alerta-beni-inundacion',
        zonaId: 'zona-trinidad-inundacion',
        departamento: 'Beni',
        tipo: TipoDesastre.INUNDACION,
        titulo: 'Alerta Hidrológica por Precipitación Acumulada en Beni',
        descripcion:
          'Lluvia acumulada en 48h triplica el umbral histórico de la cuenca del Mamoré.',
        latitud: -14.8333,
        longitud: -64.9,
        valorHistorico: 48,
        valorActual: 145,
        unidadMedida: 'mm/48h',
        fuenteApi: 'Open-Meteo Flood & SENAMHI',
        estado: EstadoAlerta.ACTIVA,
      },
    ];

    for (const a of alertas) {
      await prisma.alerta.upsert({
        where: { id: a.id },
        update: a,
        create: a,
      });
    }

    const noticias = [
      {
        id: 'noticia-auto-oruro',
        alertaId: 'alerta-oruro-helada',
        zonaId: 'zona-challapata-helada',
        autorId: null,
        titulo: 'Alerta automática: descenso brusco a -8.5 °C amenaza cultivos en Challapata',
        resumen:
          'El monitor histórico vs. actual detectó una anomalía térmica de -7.3 °C en Oruro.',
        contenido:
          'El sistema de Alertas Tempranas de AyniRadar comparó el promedio histórico con el pronóstico en vivo y activó alerta preventiva para comunidades productoras de quinua y ganado camélido.',
        esAutomatica: true,
      },
      {
        id: 'noticia-auto-beni',
        alertaId: 'alerta-beni-inundacion',
        zonaId: 'zona-trinidad-inundacion',
        autorId: null,
        titulo: 'Alerta automática: lluvias de 145 mm elevan riesgo de desborde en Trinidad',
        resumen: 'Caudales en ascenso en la cuenca del Mamoré activan respuesta solidaria.',
        contenido:
          'Se registraron 145 mm frente a una media histórica de 48 mm. Organizaciones aliadas ya reciben aportes directos vía QR para agua potable y alimentos.',
        esAutomatica: true,
      },
      {
        id: 'noticia-editorial-robore',
        alertaId: null,
        zonaId: 'zona-robore-incendio',
        autorId: 'usr-publicador',
        titulo: 'Brigadas forestales de Roboré reciben primera entrega directa de agua e insumos',
        resumen: 'Trazabilidad verificada de Bs 2.500 y 120 litros de agua entregados en campo.',
        contenido:
          'Gracias a los aportes directos registrados en AyniRadar, la Brigada Forestal Chiquitanía recibió insumos prioritarios sin intermediación burocrática.',
        esAutomatica: false,
      },
    ];

    for (const n of noticias) {
      await prisma.noticia.upsert({
        where: { id: n.id },
        update: n,
        create: n,
      });
    }

    const distribuciones = [
      {
        id: 'dist-robore-1',
        zonaId: 'zona-robore-incendio',
        organizacionId: 'org-brigada-chiquitania',
        montoBs: 2500,
        qrDestinoUrl: 'https://placehold.co/300x300/png?text=QR+Brigada+Chiquitania',
        comprobanteUrl: 'https://placehold.co/400x260/png?text=Transferencia+QR+2500Bs',
        evidenciaUrl: 'https://placehold.co/400x260/png?text=Acta+Entrega+Brigada',
        observacion: 'Compra de motobombas portátiles y agua hidratante.',
        estado: EstadoDistribucion.ENTREGADA,
      },
      {
        id: 'dist-trinidad-1',
        zonaId: 'zona-trinidad-inundacion',
        organizacionId: 'org-cruz-roja-beni',
        montoBs: 3000,
        qrDestinoUrl: 'https://placehold.co/300x300/png?text=QR+Cruz+Roja+Beni',
        comprobanteUrl: 'https://placehold.co/400x260/png?text=Transferencia+QR+3000Bs',
        observacion: 'Despacho en curso para kits de potabilización.',
        estado: EstadoDistribucion.ENVIADA,
      },
    ];

    for (const dist of distribuciones) {
      await prisma.distribucionQr.upsert({
        where: { id: dist.id },
        update: dist,
        create: dist,
      });
    }

    process.stdout.write(
      'Seed AyniRadar completado: 4 organizaciones, 10 usuarios, 9 zonas, 7 reportes, 7 donaciones, 2 alertas, 3 noticias, 2 distribuciones QR.\n',
    );
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err: unknown) => {
  process.stderr.write(`Error en seed: ${String(err)}\n`);
  process.exit(1);
});
