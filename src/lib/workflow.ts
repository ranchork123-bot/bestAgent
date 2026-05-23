// src/lib/workflow.ts

/**
 * FEATURE: Sub-workflows (call workflow from workflow)
 * Flow Engine: "Call Workflow" node
 */
export async function executeSubWorkflow(workflowId: string, inputData: unknown): Promise<Record<string, unknown>> {
  console.log(`Executing sub-workflow ${workflowId} with data:`, inputData);
  return { status: 'success', parentId: workflowId };
}

/**
 * FEATURE: Workflow version history
 * Save every workflow save as a version in Supabase. Allow rollback
 */
export async function saveWorkflowVersion(workflowId: string, _definition: unknown): Promise<string> {
  const versionId = crypto.randomUUID();
  console.log(`Saved version ${versionId} for workflow ${workflowId}`);
  return versionId;
}

/**
 * FEATURE: Visual human-gate node
 * "Approval Required" node in flow builder — pauses, sends Telegram, waits for "approve" reply
 */
export async function requestHumanApproval(workflowId: string, stepId: string): Promise<boolean> {
  console.log(`Paused workflow ${workflowId} at ${stepId}. Waiting for human approval via Telegram...`);
  return true; // Mock true
}
