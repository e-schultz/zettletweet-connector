
export interface ContinuityBridge {
  bridge_id: string;
  metadata: {
    active_threads?: string;
    conversation_id: string;
    mode: string;
    ctx_markers: string;
    timestamp: string;
    anchor_id?: string;
  };
  section_data?: {
    session_context: {
      date: string;
      timestamp_markers: string[];
    };
    active_threads: {
      name: string;
      activities: string[];
    }[];
    notable_context_elements: {
      system_mode: string;
      key_metaphors: string[];
      signal_phrases: string[];
      open_traces: string[];
    };
  };
  content_summary?: string;
}

export interface ContinuityBridgesData {
  continuity_bridges: ContinuityBridge[];
}
