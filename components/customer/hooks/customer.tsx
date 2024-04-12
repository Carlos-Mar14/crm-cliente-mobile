import { useEffect, useState } from "react";
import { api } from "../../../utils/api";

interface ICustomer {
  id?: number;
  name?: string;
  agent?: string;
  operator?: string;
  last_modified?: string;
  created_at?: string;
  status?: string;
  persona_contacto?: string;
  email?: string;
  cargo?: string;
  schedule?: string;
  cnae?: string; // CNAE
  persona_contacto_email?: string;
  client_type?: string;
  document_type?: string;
  dni?: string;
  factura_en_papel?: string;
}

export const useCustomer = (id) => {
  const [customer, setCustomer] = useState<ICustomer | null>(null);

  useEffect(() => {
    getCustomerData();
  });

  async function getCustomerData() {
    try {
      const response = await api.get<ICustomer>(`/cards/${id}/`);
      setCustomer(response.data);
    } catch (error) {
      setCustomer(null);
    }
  }

  return { customer };
};
