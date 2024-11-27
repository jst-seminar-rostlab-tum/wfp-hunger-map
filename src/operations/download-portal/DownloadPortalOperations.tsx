import { DocumentDownload } from 'iconsax-react';
import { Bot } from 'lucide-react';

import { CustomButton } from '@/components/Buttons/CustomButton';
import { CountryCodesData } from '@/domain/entities/country/CountryCodesData';
import { CustomTableColumns } from '@/domain/props/CustomTableProps';

export class DownloadPortalOperations {
  static getColumns(): CustomTableColumns {
    return [
      { columnId: 'keyColumn', label: 'Number' },
      { columnId: 'country', label: 'Country' },
      { columnId: 'preview', label: 'Preview' },
      { columnId: 'download', label: 'Download' },
      { columnId: 'chat', label: 'Chat' },
    ] as CustomTableColumns;
  }

  static formatTableData(data: CountryCodesData[], onSelectCountry: (country: CountryCodesData) => void) {
    return data.map((item, index) => ({
      keyColumn: (index + 1).toString(),
      country: item.country.name,
      preview: (
        <CustomButton
          onClick={() => {
            onSelectCountry(item);
          }}
          className="hover:underline"
        >
          Preview
        </CustomButton>
      ),
      download: (
        <a
          href={item.url.summary}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-center items-center"
        >
          <DocumentDownload size={20} />
        </a>
      ),
      chat: (
        <div className="flex justify-center items-center">
          <Bot size={20} />
        </div>
      ),
    }));
  }

  static downloadJsonFile(data: string, country: string): void {
    const a = document.createElement('a');
    const file = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(file);
    a.href = url;
    a.download = `${country}_food_security_data.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
