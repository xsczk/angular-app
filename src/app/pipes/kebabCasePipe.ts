import {Pipe, PipeTransform} from '@angular/core';

@Pipe(
  {
    name: 'kebabCase'
  }
)

export class KebabCasePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (value === null || value === undefined) {
      return '';
    }
    return value
      .trim()
      .toLowerCase()
      .replace(/[_\s]+/g, '-')        // spaces/underscores to hyphen
      .replace(/[^a-z0-9-]+/g, '')    // remove non-alphanumeric except hyphen
      .replace(/-+/g, '-')            // collapse consecutive hyphens
      .replace(/^-|-$/g, '');         // trim leading/trailing hyphens

  }
}
