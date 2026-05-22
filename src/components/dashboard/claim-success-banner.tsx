import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ClaimSuccessBanner({
  claimId,
  status,
}: {
  claimId: number;
  status: string;
}) {
  return (
    <Card className="border-[#007FFF]/40 bg-[#007FFF]/10">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="size-5 text-[#007FFF]" />
          <CardTitle className="text-base">Warranty claim submitted</CardTitle>
        </div>
        <CardDescription>
          Your claim is in the system and awaiting review.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-muted-foreground">
          Claim <span className="font-mono text-foreground">#{claimId}</span>
        </span>
        <Badge className="bg-[#007FFF]/20 text-[#007FFF] capitalize">{status}</Badge>
        <Button render={<Link href="/claim" />} variant="outline" size="sm">
          Submit another claim
        </Button>
      </CardContent>
    </Card>
  );
}
