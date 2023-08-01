/**
 * InsuranceClaimFormModel name's Theme for the color of the View template
 */
export class Theme {
  /**
   * Showing Template with 'blank Theme Props'
   */
  themeProps = 'blankThemeProps';
  /**
   * showBreadCrumbs initialised to true
   */
  showBreadCrumbs = true;
  /**
   * showPDFPreview initialised to true
   */
  showPDFPreview = true;
  /**
   * The default application language is english
   */
  language = 'en-GB';

  /**
   * Constructor To assign the elements to the view as initialisation
   */
  public constructor(init?: Partial<Theme>) {
    Object.assign(this, init);
  }
}
