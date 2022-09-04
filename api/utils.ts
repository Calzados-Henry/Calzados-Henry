export const parseAddress = (addressFromRequest: any): string => {
    if (!isString(addressFromRequest)) {
      throw new Error('Incorrect or missing address')
    }
    return addressFromRequest
  }

export const parseZip_Code =  (zip_CodeFromRequest: any): number => {

}
  const isString = (string: string): boolean => {
    return typeof string === 'string'
  }