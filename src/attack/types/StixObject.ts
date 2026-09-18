export interface StixObject {
  id: string;
  type: string;
  name?: string;
  description?: string;
  revoked?: boolean;
  x_mitre_deprecated?: boolean;
  x_mitre_is_subtechnique?: boolean;
  x_mitre_platforms?: string[];
  x_mitre_domains?: string[];
  x_mitre_analytic_refs?: string[];
  x_mitre_log_source_references?: StixLogSourceReference[];
  x_mitre_mutable_elements?: StixMutableElement[];
  kill_chain_phases?: StixKillChainPhase[];
  external_references?: StixExternalReference[];
  relationship_type?: string;
  source_ref?: string;
  target_ref?: string;
}

export interface StixExternalReference {
  source_name?: string;
  external_id?: string;
  url?: string;
}

export interface StixKillChainPhase {
  kill_chain_name?: string;
  phase_name?: string;
}

export interface StixLogSourceReference {
  name?: string;
  channel?: string;
}

export interface StixMutableElement {
  field?: string;
  description?: string;
}
