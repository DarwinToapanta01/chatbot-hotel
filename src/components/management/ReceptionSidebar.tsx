import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

export function ReceptionSidebar() {
  return (
    <aside className="w-[320px] shrink-0 flex flex-col gap-16 h-full overflow-y-auto pr-4 custom-scrollbar">
      {/* Panel de Entradas de Hoy */}
      <div className="bg-surface-white border border-black/10 rounded-sm p-16 shadow-subtle-2">
        <h3 className="text-body-sm font-semibold text-midnight-ink mb-12 flex justify-between items-center">
          Reservas de Hoy
          <span className="bg-pale-mint text-deep-teal text-[10px] px-6 py-2 rounded-sm">3</span>
        </h3>
        <ul className="flex flex-col gap-8">
          <li className="flex justify-between items-start border-b border-black/5 pb-8 last:border-0 last:pb-0">
            <div>
              <div className="text-caption font-medium text-midnight-ink">Carlos Ruiz</div>
              <div className="text-[11px] text-slate-grille">Llegada: 14:00</div>
            </div>
            <div className="text-caption font-semibold text-oceanic-deep">Hab. 104</div>
          </li>
          <li className="flex justify-between items-start border-b border-black/5 pb-8 last:border-0 last:pb-0">
            <div>
              <div className="text-caption font-medium text-midnight-ink">Ana Silva</div>
              <div className="text-[11px] text-slate-grille">Llegada: 16:30</div>
            </div>
            <div className="text-caption font-semibold text-oceanic-deep">Hab. 201</div>
          </li>
        </ul>
      </div>

      {/* Panel de Salidas de Hoy */}
      <div className="bg-surface-white border border-black/10 rounded-sm p-16 shadow-subtle-2">
        <h3 className="text-body-sm font-semibold text-midnight-ink mb-12 flex justify-between items-center">
          Salidas de Hoy
          <span className="bg-warm-mist text-amber-pop text-[10px] px-6 py-2 rounded-sm">2</span>
        </h3>
        <ul className="flex flex-col gap-8">
          <li className="flex justify-between items-start border-b border-black/5 pb-8 last:border-0 last:pb-0">
            <div>
              <div className="text-caption font-medium text-midnight-ink">Juan Pérez</div>
            </div>
            <div className="text-caption font-semibold text-oceanic-deep">Hab. 102</div>
          </li>
          <li className="flex justify-between items-start border-b border-black/5 pb-8 last:border-0 last:pb-0">
            <div>
              <div className="text-caption font-medium text-midnight-ink">Maria Gómez</div>
            </div>
            <div className="text-caption font-semibold text-oceanic-deep">Hab. 202</div>
          </li>
        </ul>
      </div>

      {/* Formulario Compacto de Nueva Reserva */}
      <div className="bg-surface-white border border-spring-leaf/50 rounded-sm p-16 shadow-subtle">
        <h3 className="text-body font-semibold text-oceanic-deep mb-16">Nueva Reserva Rápida</h3>
        <form className="flex flex-col gap-12" onSubmit={(e) => e.preventDefault()}>
          <div>
            <Input type="text" placeholder="Nombre completo del huésped" className="text-caption h-28" />
          </div>
          <div className="grid grid-cols-2 gap-8">
            <Input type="date" className="text-caption h-28 px-4" title="Llegada" />
            <Input type="date" className="text-caption h-28 px-4" title="Salida" />
          </div>
          <div>
            <Select className="text-caption h-28">
              <option value="">Seleccione Habitación...</option>
              <option value="101">101 - Sencilla</option>
              <option value="204">204 - Doble</option>
            </Select>
          </div>
          <div>
            <Input type="number" placeholder="Monto del Depósito ($)" className="text-caption h-28" />
          </div>
          <Button variant="primary" className="w-full mt-4 h-32 text-caption">Confirmar Reserva</Button>
        </form>
      </div>
    </aside>
  );
}
