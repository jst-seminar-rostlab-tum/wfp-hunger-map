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

  static downloadPdf(country: CountryCodesData) {
    const link = document.createElement('a');
    link.href = country.url.summary;
    link.download = `${country.country.name}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
