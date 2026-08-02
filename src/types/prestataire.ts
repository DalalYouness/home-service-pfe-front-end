/**
 * Represents the local form state inside the React component.
 */
export interface PrestataireInfo {
  interventionArea: string;
  service: string;
}

/**
 * Payload sent to the backend endpoint to initiate the role switch.
 */
export interface BecomePrestataireDto {
  interventionArea: string;
}

/**
 * Successful response structure returned from the authentication/gateway service.
 */
export interface BecomePrestataiteRespDto {
  message: string;
  token: string;
  roles: string[];
}

export interface SwitchModeResponse {
  message: string;
}
