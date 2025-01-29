'use client';

import { useState } from 'react';

import { useChatbot } from '@/domain/contexts/ChatbotContext';
import { useSnackbar } from '@/domain/contexts/SnackbarContext';
import { YearInReview } from '@/domain/entities/YearInReview';
import { PdfFile } from '@/domain/props/PdfViewerProps';
import YearInReviewReportsProps from '@/domain/props/YearInReviewReportsProps';
import { DownloadPortalOperations } from '@/operations/download-portal/DownloadPortalOperations';

import PdfPreview from '../Pdf/PdfPreview';
import CustomTable from '../Table/CustomTable';

export default function YearInReviewReports({ yearInReviewReports }: YearInReviewReportsProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [pdfFile, setPdfFile] = useState<PdfFile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<YearInReview | null>(null);
  const { initiateChatAboutReport } = useChatbot();
  const toggleModal = () => setModalOpen((prev) => !prev);
  const { showSnackBar } = useSnackbar();
  const yearOfReport = selectedReport?.label.match(/\d{4}/)?.[0];

  return (
    <div>
      <CustomTable
        columns={DownloadPortalOperations.getColumns()}
        data={DownloadPortalOperations.formatYearInReviewTableData(
          yearInReviewReports,
          setSelectedReport,
          initiateChatAboutReport,
          setPdfFile,
          setError,
          toggleModal,
          showSnackBar
        )}
        ariaLabel="Year In Review Reports"
      />
      <PdfPreview
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        pdfFile={pdfFile}
        error={error}
        onDownloadPdf={() => {
          if (selectedReport) {
            DownloadPortalOperations.downloadYearInReviewReport(selectedReport, showSnackBar);
          }
        }}
        onAskAIButtonClick={initiateChatAboutReport}
        reportContext={{
          type: 'year_in_review',
          value: yearOfReport ?? '',
        }}
      />
    </div>
  );
}
