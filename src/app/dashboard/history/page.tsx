
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { History as HistoryIcon, Filter } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import type { StoredDonation } from '@/types'; // Assuming StoredDonation type will be defined

// Mock data structure - this will be replaced by localStorage data
// interface StoredDonation {
//   id: string;
//   type: 'Thakur Bhog' | 'Satsang Sponsorship' | 'Maintenance Contribution';
//   date: string; // ISO string
//   amount: number;
//   transactionId?: string;
//   name?: string; // Name of donor
//   purpose?: string; // For sponsorship
//   gotra?: string; // For bhog
//   familyCode?: string; // For maintenance
// }

const donationTypes = ["All", "Thakur Bhog", "Satsang Sponsorship", "Maintenance Contribution"] as const;
type DonationFilterType = typeof donationTypes[number];

export default function ContributionHistoryPage() {
  const { user } = useAuth();
  const [donations, setDonations] = useState<StoredDonation[]>([]);
  const [filteredDonations, setFilteredDonations] = useState<StoredDonation[]>([]);
  const [filter, setFilter] = useState<DonationFilterType>("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.id !== 'guest') {
      setLoading(true);
      // Simulate fetching from localStorage or a backend
      const storedData = localStorage.getItem(`donations_${user.id}`);
      const userDonations: StoredDonation[] = storedData ? JSON.parse(storedData) : [];
      setDonations(userDonations);
      setFilteredDonations(userDonations); // Initially show all
      setLoading(false);
    } else {
      setDonations([]);
      setFilteredDonations([]);
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (filter === "All") {
      setFilteredDonations(donations);
    } else {
      setFilteredDonations(donations.filter(d => d.type === filter));
    }
  }, [filter, donations]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading contribution history...</div>;
  }

  if (!user || user.id === 'guest') {
    return <div className="container mx-auto px-4 py-8 text-center">Please log in to view your contribution history.</div>;
  }

  return (
    <Card className="shadow-lg animate-in fade-in slide-in-from-bottom-10 duration-500 ease-out">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl text-primary">
          <HistoryIcon className="mr-2 h-7 w-7" />
          Your Contribution History
        </CardTitle>
        <CardDescription>View all your past donations and contributions.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex items-center gap-4">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <Select value={filter} onValueChange={(value: DonationFilterType) => setFilter(value)}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Filter by donation type" />
            </SelectTrigger>
            <SelectContent>
              {donationTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filteredDonations.length === 0 ? (
          <div className="text-center py-10">
            <HistoryIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-semibold">No contributions found.</p>
            <p className="text-muted-foreground">
              {filter === "All" ? "You haven't made any donations yet." : `No ${filter.toLowerCase()} contributions found.`}
            </p>
            <Button asChild className="mt-4">
              <a href="/donations/thakur-bhog">Make a Donation</a>
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date &amp; Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount (₹)</TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDonations.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((donation) => (
                  <TableRow key={donation.id}>
                    <TableCell>{new Date(donation.date).toLocaleString()}</TableCell>
                    <TableCell>{donation.type}</TableCell>
                    <TableCell className="font-medium text-right">{donation.amount.toFixed(2)}</TableCell>
                    <TableCell>{donation.transactionId || 'N/A'}</TableCell>
                    <TableCell className="text-xs">
                      {donation.name && <div>Name: {donation.name}</div>}
                      {donation.purpose && <div>Purpose: {donation.purpose}</div>}
                      {donation.gotra && <div>Gotra: {donation.gotra}</div>}
                      {donation.familyCode && <div>Family Code: {donation.familyCode}</div>}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
