// Define more specific CaseData interface
export interface CaseData {
  caseTitle: string;
  budget: number;
  // Add other specific properties your case data should have
  description?: string;
  status?: string;
  createdAt?: Date;
}

// Define action types with union type for better type safety
type CaseDataActionTypes = 
  | { type: 'caseData/SET_DATA'; payload: CaseData }
  | { type: 'caseData/CLEAR_DATA' };

// Initial state
const initialState: CaseData | null = null;

// Case data reducer
const caseDataReducer = (
  state: CaseData | null = initialState,
  action: CaseDataActionTypes
): CaseData | null => {
  switch (action.type) {
    case 'caseData/SET_DATA':
      console.log(action.payload.caseTitle);
      console.log(action.payload.budget);
      return action.payload;
    case 'caseData/CLEAR_DATA':
      return null;
    default:
      return state;
  }
};

export default caseDataReducer;